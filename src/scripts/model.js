import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default class Model {
  constructor(options) {
    this.scene = options.scene;
    this.speed = options.speed || 0;
    this.position = options.position ?? { x: 0, y: 0, z: 0 };
    this.rotation = options.rotation ?? { x: 0, y: 0, z: 0 };
    this.path = options.path;
    this.animationActive = false;
    this.loader = new GLTFLoader();
    this.loader.load(
      this.path,
      (gltf) => {
        this.gltf = gltf;
        this.setPosition();
        this.setRotation();
        this.scene.add(this.gltf.scene);
      },
      undefined,
      (err) => {
        console.error("[ERROR]: unable to load model", err);
      },
    );
  }

  setPosition() {
    if (this.gltf) {
      this.gltf.scene.position.x = this.position.x;
      this.gltf.scene.position.y = this.position.y;
      this.gltf.scene.position.z = this.position.z;
    }
  }

  setRotation() {
    if (this.gltf) {
      this.gltf.scene.rotation.x = this.rotation.x;
      this.gltf.scene.rotation.y = this.rotation.y;
      this.gltf.scene.rotation.z = this.rotation.z;
    }
  }

  startAnimationWithDelay(delay) {
    if (!this.animationActive) {
      this.animationActive = true;

      setTimeout(() => this.animate(), delay);
    }
  }
}
