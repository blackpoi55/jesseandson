"""Turn a turntable photo shoot into a smooth 360° spin for the showroom.

    python scripts/spin360/build.py <folder of JPGs> scripts/spin360/studio-navy.json [--details-only]

Needs Python 3.10+ with numpy and opencv-python-headless.

The script:
- crops every photo to the same 3:4 window (the camera is locked off, so nothing moves but the garment)
- patches anything that strays into the frame (see "patches" in the config)
- evens out exposure flicker by matching the backdrop brightness
- adds in-between frames with bidirectional optical flow so the spin never jumps.
  Flow tears (light streaks inside the cloth) are refilled.
- places the detail hotspots ("details" in the config) on every photo where they can be seen,
  and crops a close-up of each (--details-only redoes just this step)
- writes public/media/360/<id>/NNN.webp (every frame), hq/NNN.webp (the original photos,
  sharper, shown at rest), details/<detail>.webp and src/content/spins/<id>.json for the viewer.
"""
import json
import pathlib
import sys

import cv2
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[2]
W, H = 960, 1280  # working size for the flow
FRAME_SIZE, FRAME_QUALITY = (900, 1200), 82
STILL_SIZE, STILL_QUALITY = (1500, 2000), 86
MAX_TRACK_ERROR = 6  # px at working size: forward-backward disagreement that means "hidden"


def backdrop_level(img):
    """Median grey of the upper corners, which are always plain backdrop."""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return float(np.median(np.concatenate([g[40:300, 20:140].ravel(), g[40:300, -140:-20].ravel()])))


DIS = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
DIS.setFinestScale(0)
DIS.setPatchSize(12)
DIS.setPatchStride(3)
DIS.setGradientDescentIterations(30)
DIS.setVariationalRefinementIterations(8)


def flow(a, b):
    ga = cv2.GaussianBlur(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), (3, 3), 0)
    gb = cv2.GaussianBlur(cv2.cvtColor(b, cv2.COLOR_BGR2GRAY), (3, 3), 0)
    return DIS.calc(ga, gb, None)


def flow_smooth(a, b, scale=0.5):
    """Half-res, large-patch, heavily regularised flow: steadier on side views where a sleeve crosses the body."""
    d = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
    d.setFinestScale(0)
    d.setPatchSize(16)
    d.setPatchStride(4)
    d.setGradientDescentIterations(40)
    d.setVariationalRefinementIterations(20)
    d.setVariationalRefinementAlpha(40.0)
    ga = cv2.cvtColor(cv2.resize(a, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2GRAY)
    gb = cv2.cvtColor(cv2.resize(b, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2GRAY)
    return cv2.resize(d.calc(ga, gb, None), (a.shape[1], a.shape[0])) / scale


def warp(img, f):
    h, w = f.shape[:2]
    gx, gy = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(img, gx + f[..., 0], gy + f[..., 1], cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)


def consistency(fab, fba):
    """Forward-backward error on a's grid: large where a's pixel is hidden in b."""
    return np.linalg.norm(fab + warp(fba, fab), axis=2)


def interpolate(a, b, fab, fba, t, err_a, err_b):
    """Frame at time t between a and b, occlusion-aware (Super-SloMo linear flow approximation)."""
    ft0 = -t * (1 - t) * fab + t * t * fba
    ft1 = (1 - t) * (1 - t) * fab - t * (1 - t) * fba
    wa = warp(a, ft0).astype(np.float32)
    wb = warp(b, ft1).astype(np.float32)
    v0 = (1 - t) * np.exp(-warp(err_a, ft0) / 3.0) + 1e-4
    v1 = t * np.exp(-warp(err_b, ft1) / 3.0) + 1e-4
    out = (v0[..., None] * wa + v1[..., None] * wb) / (v0 + v1)[..., None]
    return np.clip(out, 0, 255).astype(np.uint8)


def subject_mask(img, level):
    """Garment, mannequin and stand: anything that differs clearly from the grey backdrop."""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    m = (np.abs(g - level) > 22) | (hsv[..., 1] > 40)
    return cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8)).astype(bool)


def pair_quality(a, b, fab, fba, region):
    """Mean photometric error of predicting b from a (and a from b) inside the subject. Lower is better."""
    ea = np.abs(warp(b, fab).astype(np.float32) - a.astype(np.float32)).mean(axis=2)
    eb = np.abs(warp(a, fba).astype(np.float32) - b.astype(np.float32)).mean(axis=2)
    return float((ea[region].mean() + eb[region].mean()) / 2)


def repair(mid, a, b, t, level):
    """Pixels that are cloth in both photos but came out light in the in-between are flow tears: refill them."""
    both = subject_mask(a, level) & subject_mask(b, level)
    both = cv2.erode(both.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
    g = cv2.cvtColor(mid, cv2.COLOR_BGR2GRAY).astype(np.float32)
    ga = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY).astype(np.float32)
    gb = cv2.cvtColor(b, cv2.COLOR_BGR2GRAY).astype(np.float32)
    bad = both & (g > np.maximum(ga, gb) + 25)
    bad = cv2.dilate(bad.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(np.float32)
    w = np.clip(cv2.GaussianBlur(bad, (0, 0), 2.5) * 2, 0, 1)[..., None]
    fill = a.astype(np.float32) * (1 - t) + b.astype(np.float32) * t
    return np.clip(mid * (1 - w) + fill * w, 0, 255).astype(np.uint8)


def torso_motion(a, level, fab):
    """Median sideways travel of the jacket between two photos (px at working size), and its sign."""
    band = subject_mask(a, level)
    band[:250] = False
    band[700:] = False
    fx = fab[..., 0][band]
    return float(np.median(np.abs(fx))), float(np.median(fx))


def patch_left(img, donor, x1, feather):
    """Replace the strip left of x1 with the same strip from a clean frame."""
    w = np.ones(img.shape[1], np.float32)
    w[x1:] = 0
    w[x1 - feather : x1] = np.linspace(1, 0, feather)
    w = w[None, :, None]
    return np.clip(donor.astype(np.float32) * w + img.astype(np.float32) * (1 - w), 0, 255).astype(np.uint8)


def save_webp(img, path, size, quality):
    cv2.imwrite(str(path), cv2.resize(img, size, interpolation=cv2.INTER_AREA), [cv2.IMWRITE_WEBP_QUALITY, quality])


def load(src_dir, cfg):
    """Cropped, patched, exposure-matched photos: full resolution and working size."""
    files = {p.stem[-3:]: p for p in sorted(pathlib.Path(src_dir).glob("*.jpg"))}
    seq = cfg["sequence"]
    y0, ch = cfg["crop"]["y"], cfg["crop"]["height"]
    full = {n: cv2.imread(str(files[n]), cv2.IMREAD_COLOR)[y0 : y0 + ch, :] for n in {*seq, *(p["from"] for p in cfg.get("patches", []))}}
    small = {n: cv2.resize(im, (W, H), interpolation=cv2.INTER_AREA) for n, im in full.items()}
    levels = {n: backdrop_level(im) for n, im in small.items()}
    for p in cfg.get("patches", []):
        n, d = p["frame"], p["from"]
        s = full[n].shape[1] / W
        for store, k in ((small, 1), (full, s)):
            donor = np.clip(store[d].astype(np.float32) * (levels[n] / levels[d]), 0, 255)
            store[n] = patch_left(store[n], donor, int(p["left"] * k), int(40 * k))
    # even out exposure flicker: match every backdrop to the median level
    target = float(np.median([levels[n] for n in seq]))
    gain = {n: target / levels[n] for n in seq}
    frames = [np.clip(small[n].astype(np.float32) * gain[n], 0, 255).astype(np.uint8) for n in seq]
    stills = {n: np.clip(full[n].astype(np.float32) * gain[n], 0, 255).astype(np.uint8) for n in seq}
    return seq, frames, stills, target


def build_frames(cfg, seq, frames, stills, target, out):
    step = float(cfg.get("step", 3.5))
    (out / "hq").mkdir(parents=True, exist_ok=True)
    motion_frames, keys, report = [], [], []
    for i, a in enumerate(frames):
        b = frames[(i + 1) % len(frames)]
        keys.append(len(motion_frames))
        motion_frames.append(a)
        fab, fba = flow(a, b), flow(b, a)
        region = cv2.dilate((subject_mask(a, target) | subject_mask(b, target)).astype(np.uint8), np.ones((31, 31), np.uint8)).astype(bool)
        fab[~region] = 0  # the backdrop never moves
        fba[~region] = 0
        q = pair_quality(a, b, fab, fba, region)
        motion, signed = torso_motion(a, target, fab)
        if q > 4.5:
            fab, fba = flow_smooth(a, b), flow_smooth(b, a)
            fab[~region] = 0
            fba[~region] = 0
        count = int(min(8, max(0, round(motion / step) - 1)))
        ea, eb = consistency(fab, fba), consistency(fba, fab)
        for k in range(1, count + 1):
            t = k / (count + 1)
            motion_frames.append(repair(interpolate(a, b, fab, fba, t, ea, eb), a, b, t, target))
        report.append({"from": seq[i], "to": seq[(i + 1) % len(seq)], "quality": round(q, 2), "motion": round(signed, 1), "inBetween": count})
        print(report[-1], flush=True)

    for idx, img in enumerate(motion_frames):
        save_webp(img, out / f"{idx:03d}.webp", FRAME_SIZE, FRAME_QUALITY)
    for n, k in zip(seq, keys):
        save_webp(stills[n], out / "hq" / f"{k:03d}.webp", STILL_SIZE, STILL_QUALITY)

    # +1 when a higher frame index moves the front of the garment to the viewer's right
    direction = -1 if np.median([r["motion"] for r in report]) < 0 else 1
    corner = cv2.resize(frames[0], FRAME_SIZE, interpolation=cv2.INTER_AREA)[40:300, 20:140].reshape(-1, 3).mean(axis=0)
    print(f"{len(motion_frames)} frames from {len(seq)} photographs -> {out}")
    return {
        "dir": f"/media/360/{cfg['id']}",
        "count": len(motion_frames),
        "keyframes": keys,
        "direction": direction,
        "backdrop": "#{:02x}{:02x}{:02x}".format(*(int(round(c)) for c in corner[::-1])),
        "photographs": seq,
    }


def build_details(cfg, seq, frames, stills, target, out, keys):
    """Close-up crops and on-garment positions for each detail hotspot.

    Each detail is placed by hand on one or two photos ("anchors"). Optical flow then carries
    the point to the neighbouring photos, for as long as it stays in view: it must track
    consistently both ways and stay clear of the silhouette edge.
    """
    n = len(frames)
    edge = [cv2.distanceTransform(subject_mask(f, target).astype(np.uint8), cv2.DIST_L2, 5) for f in frames]
    cache = {}

    def fl(i, j):
        if (i, j) not in cache:
            cache[(i, j)] = flow(frames[i], frames[j]).astype(np.float16)
        return cache[(i, j)]

    def at(f, p):
        x, y = int(round(p[0])), int(round(p[1]))
        return np.median(f[y - 3 : y + 4, x - 3 : x + 4].reshape(-1, 2).astype(np.float32), axis=0)

    def inside(p):
        return 8 <= p[0] < W - 8 and 8 <= p[1] < H - 8

    (out / "details").mkdir(parents=True, exist_ok=True)
    details = {}
    for d in cfg.get("details", []):
        found = {}  # photo index -> (steps from its anchor, point)
        for a in d["anchors"]:
            i0 = seq.index(a["photo"])
            p0 = np.array([a["x"], a["y"]], np.float32)
            found[i0] = (0, p0)
            for sign in (1, -1):
                i, p = i0, p0
                for step in range(1, 11):
                    j = (i + sign) % n
                    q = p + at(fl(i, j), p)
                    if not inside(q):
                        break
                    back = q + at(fl(j, i), q)
                    err = np.linalg.norm(back - p)
                    if err > MAX_TRACK_ERROR or edge[j][int(q[1]), int(q[0])] < 12:
                        print("  ", d["id"], "stops at", seq[j], "error", round(float(err), 1), "edge", round(float(edge[j][int(q[1]), int(q[0])]), 1))
                        break  # hidden behind the garment, or turned to the edge
                    if j not in found or found[j][0] > step:
                        found[j] = (step, q)
                    i, p = j, q
        crop = d["crop"]
        still = stills[crop["photo"]]
        k = still.shape[1] / W
        x0, y0, x1, y1 = (int(v * k) for v in crop["box"])
        img = still[y0:y1, x0:x1]
        side = min(900, img.shape[1])
        size = (side, int(side * img.shape[0] / img.shape[1]))
        cv2.imwrite(str(out / "details" / f"{d['id']}.webp"), cv2.resize(img, size, interpolation=cv2.INTER_AREA), [cv2.IMWRITE_WEBP_QUALITY, 86])
        details[d["id"]] = {
            "image": f"/media/360/{cfg['id']}/details/{d['id']}.webp",
            "best": keys[seq.index(d["anchors"][0]["photo"])],
            "at": {str(keys[i]): [round(float(p[0]) / W, 4), round(float(p[1]) / H, 4)] for i, (_, p) in sorted(found.items())},
        }
        print(d["id"], "visible on", len(found), "photos:", [seq[i] for i in sorted(found)], flush=True)
    return details


def main(src_dir, config_path, details_only=False):
    cfg = json.loads(pathlib.Path(config_path).read_text())
    seq, frames, stills, target = load(src_dir, cfg)
    out = ROOT / "public" / "media" / "360" / cfg["id"]
    dest = ROOT / "src" / "content" / "spins" / f"{cfg['id']}.json"
    manifest = json.loads(dest.read_text()) if details_only else build_frames(cfg, seq, frames, stills, target, out)
    if cfg.get("details"):
        manifest["details"] = build_details(cfg, seq, frames, stills, target, out, manifest["keyframes"])
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    main(args[0], args[1], details_only="--details-only" in sys.argv)
