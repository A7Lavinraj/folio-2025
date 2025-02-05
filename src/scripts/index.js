import * as THREE from "three";
import Sword from "./sword";

function main() {
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  const scene = new THREE.Scene();
  const light = new THREE.PointLight(0xffffff, 200, 100);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const sword = new Sword({
    scene: scene,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 1 * Math.PI, y: 0.5 * Math.PI, z: 0 },
    speed: 0.05,
    path: "/models/sword.glb",
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(0, 0, 5);
  light.position.set(0, 5, 10);
  scene.add(light);
  let canAnimate = false;

  function animate() {
    if (canAnimate) {
      sword.animate(2);
    }

    renderer.render(scene, camera);
  }

  setTimeout(() => {
    canAnimate = true;
  }, 3500);

  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader")?.classList.add("hidden");
    document.querySelector(".main")?.classList.add("visible");
  }, 3500);

  setTimeout(() => {
    document.querySelector(".main")?.classList.add("visible");
  }, 5000);

  main();
});
