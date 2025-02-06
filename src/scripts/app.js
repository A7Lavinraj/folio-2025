import * as THREE from "three";
import Sword from "@scripts/sword";

export default class App {
  constructor() {
    this.init();
  }

  init() {
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setObjects();
    this.setResizer();
    this.setAnimationLoop();

    if (import.meta.env.DEV) {
      this.axesHelper = new THREE.AxesHelper(10);
      this.scene.add(this.axesHelper);
    }
  }

  setRenderer() {
    this.canvas = document.querySelector("#canvas");

    if (!this.canvas) {
      throw new Error("[APP]: Unable to find any element with id canvas");
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.light = new THREE.PointLight(0xffffff, 200, 200);
    this.light.position.set(0, 5, 10);
    this.scene.add(this.light);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 5);
  }

  setObjects() {
    this.sword = new Sword({
      scene: this.scene,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: Math.PI, y: 0.5 * Math.PI, z: 0 },
      speed: 0.05,
      path: "/models/sword.glb",
    });
  }

  setResizer() {
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  setAnimationLoop() {
    this.renderer.setAnimationLoop(() => {
      this.sword.startAnimationWithDelay(3500);
      this.renderer.render(this.scene, this.camera);
    });
  }
}
