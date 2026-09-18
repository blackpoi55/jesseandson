// Procedural tailor's dress form wearing a suit, built with Three.js.
// Loaded on demand by <Mannequin3D>; never imported on the server.
import * as THREE from "three";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";

/* ------------------------------------------------------------------ */
/*  Body & jacket cross-sections (superellipse per height, metres)     */
/* ------------------------------------------------------------------ */
type Key = { y: number; a: number; b: number; n: number; c: number };
const k = (y: number, a: number, b: number, n = 2.2, c = 0): Key => ({ y, a, b, n, c });

const TORSO: Key[] = [
  k(0.76, 0.182, 0.134, 2.2),
  k(0.9, 0.178, 0.128, 2.2),
  k(0.98, 0.168, 0.118, 2.2),
  k(1.08, 0.142, 0.101, 2.3, 0.004),
  k(1.2, 0.156, 0.108, 2.4, 0.012),
  k(1.3, 0.17, 0.114, 2.5, 0.02),
  k(1.38, 0.181, 0.11, 2.6, 0.014),
  k(1.44, 0.192, 0.098, 2.9, 0.004),
  k(1.475, 0.165, 0.086, 2.7),
  k(1.5, 0.112, 0.072, 2.4),
  k(1.52, 0.064, 0.058, 2.0),
  k(1.62, 0.052, 0.052, 2.0),
];

const JACKET: Key[] = [
  k(0.78, 0.198, 0.152, 2.2),
  k(0.9, 0.195, 0.147, 2.2),
  k(1.0, 0.181, 0.136, 2.3),
  k(1.08, 0.168, 0.126, 2.35, 0.006),
  k(1.2, 0.177, 0.129, 2.45, 0.014),
  k(1.3, 0.189, 0.133, 2.55, 0.02),
  k(1.38, 0.201, 0.127, 2.7, 0.014),
  k(1.445, 0.215, 0.113, 3.0, 0.004),
  k(1.48, 0.181, 0.099, 2.7),
  k(1.51, 0.12, 0.083, 2.4),
  k(1.54, 0.079, 0.071, 2.1),
  k(1.575, 0.073, 0.067, 2.0),
];

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function section(keys: Key[], y: number): Key {
  if (y <= keys[0].y) return keys[0];
  if (y >= keys[keys.length - 1].y) return keys[keys.length - 1];
  let i = 0;
  while (keys[i + 1].y < y) i++;
  const k0 = keys[Math.max(0, i - 1)];
  const k1 = keys[i];
  const k2 = keys[i + 1];
  const k3 = keys[Math.min(keys.length - 1, i + 2)];
  const t = (y - k1.y) / (k2.y - k1.y);
  const f = (p: "a" | "b" | "n" | "c") => catmull(k0[p], k1[p], k2[p], k3[p], t);
  return { y, a: f("a"), b: f("b"), n: f("n"), c: Math.max(0, f("c")) };
}

function surface(keys: Key[], theta: number, y: number, offset: number, out: THREE.Vector3) {
  const s = section(keys, y);
  const sn = Math.sin(theta);
  const cs = Math.cos(theta);
  const p = 2 / s.n;
  const x = (s.a + offset) * Math.sign(sn) * Math.pow(Math.abs(sn), p);
  let z = (s.b + offset) * Math.sign(cs) * Math.pow(Math.abs(cs), p);
  if (cs > 0) z += s.c * cs * cs;
  return out.set(x, y, z);
}

/** Smoothstepped lookup for 1D profiles [[y, value], ...]. */
function profile(points: [number, number][], y: number) {
  if (y <= points[0][0]) return points[0][1];
  for (let i = 0; i < points.length - 1; i++) {
    const [y0, v0] = points[i];
    const [y1, v1] = points[i + 1];
    if (y <= y1) {
      const t = (y - y0) / (y1 - y0);
      return v0 + (v1 - v0) * t * t * (3 - 2 * t);
    }
  }
  return points[points.length - 1][1];
}

/* ------------------------------------------------------------------ */
/*  Cloth textures (drawn on canvas)                                   */
/* ------------------------------------------------------------------ */
type Weave = "twill" | "pinstripe" | "barathea" | "oxford" | "silk";

function fabricCanvas(weave: Weave, base: string, accent = "#ffffff") {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);

  const img = g.getImageData(0, 0, size, size);
  const amp = weave === "silk" ? 4 : weave === "oxford" ? 7 : 10;
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * amp;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);

  if (weave === "twill" || weave === "barathea") {
    g.strokeStyle = "rgba(255,255,255,0.045)";
    g.lineWidth = 1.2;
    const step = weave === "twill" ? 7 : 4;
    for (let x = -size; x < size * 2; x += step) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + size, size);
      g.stroke();
    }
  }
  if (weave === "pinstripe") {
    g.fillStyle = accent;
    for (let x = 0; x < size; x += size / 7) {
      g.globalAlpha = 0.55;
      g.fillRect(x, 0, 2.2, size);
      g.globalAlpha = 0.2;
      g.fillRect(x - 1, 0, 4.2, size);
    }
    g.globalAlpha = 1;
  }
  if (weave === "silk") {
    g.strokeStyle = accent;
    g.globalAlpha = 0.35;
    g.lineWidth = 6;
    for (let x = -size; x < size * 2; x += 46) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + size, size);
      g.stroke();
    }
    g.globalAlpha = 1;
  }
  if (weave === "oxford") {
    g.fillStyle = "rgba(0,0,0,0.025)";
    for (let y = 0; y < size; y += 3) g.fillRect(0, y, size, 1);
  }
  return c;
}

function makeTexture(canvas: HTMLCanvasElement, repeatU: number, repeatV: number, anisotropy: number) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatU, repeatV);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = anisotropy;
  return t;
}

/* ------------------------------------------------------------------ */
/*  Looks                                                              */
/* ------------------------------------------------------------------ */
export type LookId = "navy" | "charcoal" | "tuxedo";

type Look = {
  cloth: string;
  weave: Weave;
  stripe?: string;
  lapel: "notch" | "peak" | "shawl";
  lapelSatin?: boolean;
  neckwear: "tie" | "bow";
  tie: string;
  tieAccent: string;
  square: string;
  buttons: string;
  lining: string;
  oneButton?: boolean;
};

const LOOKS: Record<LookId, Look> = {
  navy: {
    cloth: "#18213a",
    weave: "twill",
    lapel: "notch",
    neckwear: "tie",
    tie: "#4a0f1a",
    tieAccent: "#6e2a36",
    square: "#f5f2ec",
    buttons: "#3a281d",
    lining: "#6b1f2c",
  },
  charcoal: {
    cloth: "#34363a",
    weave: "pinstripe",
    stripe: "#c9ccd1",
    lapel: "peak",
    neckwear: "tie",
    tie: "#1f2a45",
    tieAccent: "#6a7a99",
    square: "#7d1f2c",
    buttons: "#2a211b",
    lining: "#3b4a6b",
  },
  tuxedo: {
    cloth: "#0d0e10",
    weave: "barathea",
    lapel: "shawl",
    lapelSatin: true,
    neckwear: "bow",
    tie: "#0e0e10",
    tieAccent: "#0e0e10",
    square: "#f7f5f0",
    buttons: "#0c0c0d",
    lining: "#0f0f12",
    oneButton: true,
  },
};

const LAPELS: Record<Look["lapel"], [number, number][]> = {
  notch: [
    [1.07, 0.0],
    [1.15, 0.034],
    [1.25, 0.056],
    [1.35, 0.073],
    [1.392, 0.079],
    [1.402, 0.03],
    [1.44, 0.034],
    [1.52, 0.032],
    [1.56, 0.028],
  ],
  peak: [
    [1.07, 0.0],
    [1.15, 0.036],
    [1.25, 0.06],
    [1.35, 0.082],
    [1.408, 0.098],
    [1.414, 0.03],
    [1.45, 0.034],
    [1.52, 0.032],
    [1.56, 0.028],
  ],
  shawl: [
    [1.0, 0.0],
    [1.1, 0.036],
    [1.22, 0.056],
    [1.32, 0.062],
    [1.42, 0.054],
    [1.5, 0.04],
    [1.56, 0.03],
  ],
};

/** How far the dressed form sits below full height, so the garment fills the frame. */
export const DROP = 0.3;

/* ------------------------------------------------------------------ */
/*  Model                                                              */
/* ------------------------------------------------------------------ */
export function buildMannequin(lookId: LookId, detail = 1, anisotropy = 8) {
  const look = LOOKS[lookId];
  const group = new THREE.Group();
  const v = new THREE.Vector3();
  const res = (n: number) => Math.max(8, Math.round(n * detail));
  const buttonY = look.oneButton ? 1.03 : 1.07;
  const tex = (c: HTMLCanvasElement, u: number, vv: number) => makeTexture(c, u, vv, anisotropy);

  const clothCanvas = fabricCanvas(look.weave, look.cloth, look.stripe);
  const cloth = (ru: number, rv: number, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
    new THREE.MeshPhysicalMaterial({
      map: tex(clothCanvas, ru, rv),
      roughness: 0.82,
      sheen: 0.35,
      sheenRoughness: 0.9,
      sheenColor: new THREE.Color("#6f7890"),
      ...extra,
    });

  const shirtMat = new THREE.MeshStandardMaterial({ map: tex(fabricCanvas("oxford", "#e9e7e1"), 10, 8), roughness: 0.75 });
  const liningMat = new THREE.MeshStandardMaterial({ color: look.lining, roughness: 0.35, side: THREE.BackSide });
  const wood = new THREE.MeshStandardMaterial({ color: "#4a3223", roughness: 0.42 });
  const brass = new THREE.MeshStandardMaterial({ color: "#b8955b", metalness: 1, roughness: 0.28 });
  const horn = new THREE.MeshStandardMaterial({ color: look.buttons, roughness: 0.3 });
  const tieMat = new THREE.MeshStandardMaterial({
    map: tex(fabricCanvas("silk", look.tie, look.tieAccent), 1, 3),
    roughness: 0.62,
    side: THREE.DoubleSide,
  });
  const satin = new THREE.MeshPhysicalMaterial({ color: "#0b0b0d", roughness: 0.22, clearcoat: 0.4, clearcoatRoughness: 0.35 });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(look.lapelSatin ? "#000000" : look.cloth).multiplyScalar(0.45),
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const cast = (m: THREE.Mesh) => {
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  };

  /* --- Dress form: shirt above the waist, trousers below --- */
  group.add(
    cast(
      new THREE.Mesh(
        new ParametricGeometry((u, t, target) => surface(TORSO, u * Math.PI * 2, 0.99 + t * 0.63, 0, target), res(160), res(110)),
        shirtMat,
      ),
    ),
  );
  group.add(
    cast(
      new THREE.Mesh(
        new ParametricGeometry((u, t, target) => surface(TORSO, u * Math.PI * 2, 0.74 + t * 0.27, 0.006, target), res(160), res(40)),
        cloth(12, 3),
      ),
    ),
  );
  const seat = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshStandardMaterial({ color: "#161616" }));
  seat.rotation.x = Math.PI / 2;
  seat.scale.set(0.19, 0.14, 1);
  seat.position.y = 0.742;
  group.add(seat);

  /* --- Jacket shell with the front opening --- */
  const opening: [number, number][] = look.oneButton
    ? [
        [0.78, 0.36],
        [0.86, 0.22],
        [0.92, 0.06],
        [0.96, 0.0],
        [1.03, 0.0],
        [1.14, 0.12],
        [1.26, 0.25],
        [1.38, 0.38],
        [1.45, 0.52],
        [1.51, 0.82],
        [1.575, 1.22],
      ]
    : [
        [0.78, 0.34],
        [0.86, 0.2],
        [0.93, 0.06],
        [0.97, 0.0],
        [1.07, 0.0],
        [1.2, 0.13],
        [1.32, 0.26],
        [1.42, 0.4],
        [1.48, 0.62],
        [1.53, 0.95],
        [1.575, 1.25],
      ];
  const phi = (y: number) => profile(opening, y);
  const jacketFn = (offset: number) => (u: number, t: number, target: THREE.Vector3) => {
    const y = 0.78 + t * (1.575 - 0.78);
    const f = phi(y);
    return surface(JACKET, f + u * (Math.PI * 2 - 2 * f), y, offset, target);
  };
  group.add(cast(new THREE.Mesh(new ParametricGeometry(jacketFn(0), res(220), res(140)), cloth(12, 8))));
  group.add(new THREE.Mesh(new ParametricGeometry(jacketFn(-0.004), res(160), res(100)), liningMat));

  /* --- Lapels (with a fine darker edge) --- */
  const lapelProfile = LAPELS[look.lapel];
  const lapelStart = lapelProfile[0][0];
  const lapelEnd = lapelProfile[lapelProfile.length - 1][0];
  const lapelMat = look.lapelSatin ? satin : cloth(0.8, 3.5, { roughness: 0.7 });
  for (const side of [1, -1]) {
    const lapel = new ParametricGeometry(
      (u, t, target) => {
        const y = lapelStart + t * (lapelEnd - lapelStart);
        const f = phi(y);
        const sec = section(JACKET, y);
        const w = profile(lapelProfile, y);
        const theta = f + u * (w / Math.max(0.06, sec.b + sec.c));
        const lift = 0.0075 - u * 0.0035; // rolled edge sits higher
        return surface(JACKET, side === 1 ? theta : Math.PI * 2 - theta, y, lift, target);
      },
      24,
      res(120),
    );
    group.add(cast(new THREE.Mesh(lapel, lapelMat)));
    const edge = new ParametricGeometry(
      (u, t, target) => {
        const y = lapelStart + t * (lapelEnd - lapelStart);
        const f = phi(y);
        const sec = section(JACKET, y);
        const r = Math.max(0.06, sec.b + sec.c);
        const w = profile(lapelProfile, y);
        const theta = f + w / r - 0.0035 / r + u * (0.0035 / r);
        return surface(JACKET, side === 1 ? theta : Math.PI * 2 - theta, y, 0.0045, target);
      },
      2,
      res(160),
    );
    group.add(new THREE.Mesh(edge, edgeMat));
  }

  /* --- Centre-back seam and vent --- */
  const backLine = (y0: number, y1: number, halfWidth: number, lift: number) =>
    new THREE.Mesh(
      new ParametricGeometry(
        (u, t, target) => {
          const y = y0 + t * (y1 - y0);
          const sec = section(JACKET, y);
          // invert the superellipse so the line keeps a constant physical width
          const half = Math.pow(halfWidth / sec.a, sec.n / 2);
          return surface(JACKET, Math.PI + (u - 0.5) * 2 * half, y, lift, target);
        },
        2,
        60,
      ),
      edgeMat,
    );
  group.add(backLine(0.97, 1.53, 0.0011, 0.0015));
  group.add(backLine(0.78, 0.97, 0.0022, 0.0025));

  /* --- Buttons --- */
  const buttonGeo = new THREE.CylinderGeometry(0.0108, 0.0108, 0.005, 40);
  for (const y of look.oneButton ? [buttonY] : [buttonY, buttonY - 0.1]) {
    const b = new THREE.Mesh(buttonGeo, horn);
    surface(JACKET, 0.035, y, 0.006, v);
    b.position.copy(v);
    b.rotation.x = Math.PI / 2;
    group.add(cast(b));
  }

  /* --- Pockets --- */
  const patch = (t0: number, t1: number, y0: number, y1: number, lift: number, mat: THREE.Material, slope = 0) =>
    new THREE.Mesh(
      new ParametricGeometry(
        (u, t, target) => surface(JACKET, t0 + u * (t1 - t0), y0 + t * (y1 - y0) + slope * u, lift, target),
        24,
        6,
      ),
      mat,
    );
  const flapMat = cloth(1.2, 0.5, { roughness: 0.78 });
  if (!look.lapelSatin) {
    group.add(cast(patch(0.55, 1.12, 0.935, 0.985, 0.0045, flapMat)));
    group.add(cast(patch(Math.PI * 2 - 1.12, Math.PI * 2 - 0.55, 0.935, 0.985, 0.0045, flapMat)));
  } else {
    group.add(patch(0.6, 1.08, 0.955, 0.962, 0.003, satin));
    group.add(patch(Math.PI * 2 - 1.08, Math.PI * 2 - 0.6, 0.955, 0.962, 0.003, satin));
  }
  group.add(cast(patch(0.46, 0.76, 1.3, 1.318, 0.004, flapMat, 0.012)));
  const squareMat = new THREE.MeshStandardMaterial({ color: look.square, roughness: 0.55, side: THREE.DoubleSide });
  group.add(cast(patch(0.475, 0.745, 1.318, 1.331, 0.0052, squareMat, 0.012)));

  /* --- Shirt collar --- */
  const collarMat = new THREE.MeshStandardMaterial({ color: "#f6f5f1", roughness: 0.7, side: THREE.DoubleSide });
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.063, 0.068, 0.046, 64, 1, true, 0.24, Math.PI * 2 - 0.48), collarMat);
  collar.position.y = 1.553;
  group.add(cast(collar));
  for (const s of [1, -1]) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(s * 0.012, 1.572, 0.068),
      new THREE.Vector3(s * 0.058, 1.54, 0.05),
      new THREE.Vector3(s * 0.03, 1.5, 0.084),
      new THREE.Vector3(s * 0.012, 1.572, 0.068),
      new THREE.Vector3(s * 0.03, 1.5, 0.084),
      new THREE.Vector3(s * 0.006, 1.528, 0.078),
    ]);
    g.computeVertexNormals();
    group.add(cast(new THREE.Mesh(g, collarMat)));
  }

  /* --- Neckwear --- */
  const shirtFront = (x: number, y: number) => {
    const s = section(TORSO, y);
    const theta = Math.asin(Math.max(-1, Math.min(1, x / s.a)));
    return surface(TORSO, theta, y, 0.006, new THREE.Vector3());
  };
  if (look.neckwear === "tie") {
    const blade = new ParametricGeometry(
      (u, t, target) => {
        const y = 1.14 + t * (1.505 - 1.14);
        const w = profile(
          [
            [1.14, 0.043],
            [1.3, 0.036],
            [1.42, 0.026],
            [1.505, 0.013],
          ],
          y,
        );
        const p = shirtFront((u - 0.5) * 2 * w, y);
        return target.set(p.x, p.y, p.z + 0.004);
      },
      12,
      60,
    );
    group.add(cast(new THREE.Mesh(blade, tieMat)));
    const knot = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.013, 0.034, 24), tieMat);
    knot.position.set(0, 1.52, shirtFront(0, 1.52).z + 0.012);
    knot.scale.set(1, 1, 0.55);
    group.add(cast(knot));
  } else {
    const center = shirtFront(0, 1.522);
    for (const s of [1, -1]) {
      const wing = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), satin);
      wing.scale.set(0.036, 0.022, 0.011);
      wing.position.set(s * 0.034, 1.522, center.z + 0.014);
      wing.rotation.z = s * 0.12;
      group.add(cast(wing));
    }
    const knot = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), satin);
    knot.scale.set(0.012, 0.014, 0.012);
    knot.position.set(0, 1.522, center.z + 0.018);
    group.add(cast(knot));
    for (const y of [1.44, 1.38, 1.32]) {
      const stud = new THREE.Mesh(new THREE.SphereGeometry(0.0045, 16, 12), satin);
      stud.position.set(0, y, shirtFront(0, y).z + 0.004);
      group.add(stud);
    }
  }

  /* --- Sleeves --- */
  const ref = new THREE.Vector3(0, 0, 1);
  for (const s of [1, -1]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(s * 0.185, 1.452, 0.0),
      new THREE.Vector3(s * 0.21, 1.39, 0.004),
      new THREE.Vector3(s * 0.222, 1.2, 0.018),
      new THREE.Vector3(s * 0.226, 1.01, 0.04),
      new THREE.Vector3(s * 0.222, 0.85, 0.062),
    ]);
    const radius = (t: number) =>
      profile(
        [
          [0, 0.026],
          [0.07, 0.054],
          [0.16, 0.058],
          [0.55, 0.053],
          [1, 0.047],
        ],
        t,
      );
    const sleeve = new ParametricGeometry(
      (u, t, target) => {
        const c = curve.getPointAt(t);
        const tan = curve.getTangentAt(t);
        const n = new THREE.Vector3().crossVectors(tan, ref).normalize();
        const b = new THREE.Vector3().crossVectors(tan, n).normalize();
        const a = u * Math.PI * 2;
        const r = radius(t);
        return target.copy(c).addScaledVector(n, Math.cos(a) * r * 1.05).addScaledVector(b, Math.sin(a) * r * 0.92);
      },
      res(72),
      res(90),
    );
    group.add(cast(new THREE.Mesh(sleeve, cloth(4, 6))));
    const end = curve.getPointAt(1);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(0.046, 32), new THREE.MeshStandardMaterial({ color: "#161616" }));
    cap.position.copy(end).add(new THREE.Vector3(0, 0.004, 0));
    cap.lookAt(end.clone().add(curve.getTangentAt(1)));
    group.add(cap);
    for (const t of [0.9, 0.925, 0.95]) {
      const c = curve.getPointAt(t);
      const dir = new THREE.Vector3(s * 0.45, 0, -1).normalize();
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.004, 24), horn);
      btn.position.copy(c).addScaledVector(dir, radius(t) * 0.98);
      btn.lookAt(btn.position.clone().add(dir));
      btn.rotateX(Math.PI / 2);
      group.add(btn);
    }
  }

  /* --- Lower the dressed form onto a shorter stand --- */
  const upper = new THREE.Group();
  while (group.children.length) upper.add(group.children[0]);
  upper.position.y = -DROP;
  group.add(upper);

  const neckCap = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.054, 0.012, 48), wood);
  neckCap.position.y = 1.626 - DROP;
  group.add(cast(neckCap));
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.02, 32, 16), brass);
  knob.position.y = 1.652 - DROP;
  group.add(cast(knob));
  const knobStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.03, 16), brass);
  knobStem.position.y = 1.635 - DROP;
  group.add(knobStem);

  const poleTop = 0.742 - DROP;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, poleTop - 0.13, 24), brass);
  pole.position.y = (poleTop + 0.13) / 2;
  group.add(cast(pole));
  const collarRing = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.05, 24), brass);
  collarRing.position.y = poleTop - 0.06;
  group.add(cast(collarRing));
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.06, 32), wood);
  hub.position.y = 0.13;
  group.add(cast(hub));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
    const foot = new THREE.Vector3(Math.sin(a) * 0.3, 0.012, Math.cos(a) * 0.3);
    const top = new THREE.Vector3(Math.sin(a) * 0.03, 0.13, Math.cos(a) * 0.03);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.022, foot.distanceTo(top)), wood);
    leg.position.copy(foot).add(top).multiplyScalar(0.5);
    leg.lookAt(top);
    group.add(cast(leg));
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.02, 20), brass);
    cap.position.copy(foot);
    group.add(cast(cap));
  }

  return group;
}

/** Free GPU memory held by a model. */
export function disposeModel(root: THREE.Object3D) {
  root.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      for (const key of ["map", "roughnessMap", "normalMap"] as const) {
        const t = (m as THREE.MeshStandardMaterial)[key];
        if (t) t.dispose();
      }
      m.dispose();
    }
  });
}
