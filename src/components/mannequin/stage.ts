// Real-time studio for the mannequin: lights, floor shadow, camera and a turntable.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildMannequin, disposeModel, type LookId } from "./model";

export const BACKDROP = "#f1eee8";

const BASE_TARGET_Y = 0.74;
const ZOOM_TARGET_Y = 1.02;
const BASE_DISTANCE = 6.62;
export const BASE_ELEVATION = Math.atan2(0.24, 6.6);

export type Stage = ReturnType<typeof createStage>;

export function createStage(canvas: HTMLCanvasElement, { lowPower }: { lowPower: boolean }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.75 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKDROP);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.45;

  const camera = new THREE.PerspectiveCamera(14.5, 4 / 5, 0.1, 50);

  // Lights stay fixed while the turntable turns — like a photo studio.
  const key = new THREE.DirectionalLight("#ffffff", 2.4);
  key.position.set(-1.8, 5.2, 3.8);
  key.castShadow = true;
  key.shadow.mapSize.set(lowPower ? 1024 : 2048, lowPower ? 1024 : 2048);
  key.shadow.camera.left = -2.5;
  key.shadow.camera.right = 2.5;
  key.shadow.camera.top = 2.5;
  key.shadow.camera.bottom = -2.5;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const fill = new THREE.DirectionalLight("#fff3e6", 0.7);
  fill.position.set(3, 2.2, 2.4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight("#ffffff", 1.4);
  rim.position.set(0.5, 3.2, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight("#ffffff", "#d8d0c4", 0.45));

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.16 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const turntable = new THREE.Group();
  scene.add(turntable);

  const models = new Map<LookId, THREE.Group>();
  const detail = lowPower ? 0.7 : 1;
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const target = new THREE.Vector3();

  function model(id: LookId) {
    let m = models.get(id);
    if (!m) {
      m = buildMannequin(id, detail, anisotropy);
      models.set(id, m);
    }
    return m;
  }

  return {
    setLook(id: LookId) {
      const m = model(id);
      turntable.clear();
      turntable.add(m);
    },
    /** Build a look ahead of time so switching to it is instant. */
    prepare(id: LookId) {
      model(id);
    },
    setView(angle: number, elevation: number, zoom: number) {
      turntable.rotation.y = angle;
      const z = Math.max(0, Math.min(1, (zoom - 1) / 1.6));
      const distance = BASE_DISTANCE / zoom;
      target.set(0, BASE_TARGET_Y + (ZOOM_TARGET_Y - BASE_TARGET_Y) * z, 0);
      camera.position.set(0, target.y + Math.sin(elevation) * distance, Math.cos(elevation) * distance);
      camera.lookAt(target);
    },
    resize(width: number, height: number) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // keep the same vertical framing as the 4:5 reference whatever the aspect
      camera.fov = 14.5 * Math.max(1, 0.8 / camera.aspect);
      camera.updateProjectionMatrix();
    },
    render() {
      renderer.render(scene, camera);
    },
    dispose() {
      for (const m of models.values()) disposeModel(m);
      models.clear();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
