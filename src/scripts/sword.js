import Model from "@scripts/model.js";
import GUI from "lil-gui";

export default class Sword extends Model {
  constructor(options) {
    super(options);
    this.startY = options.position.y - 1;
    this.targetY = options.position.y + 3;
    this.speed = options.speed ?? 0.02;
    this.rotationSpeed = Math.PI / 480;
    this.easingFactor = 0.99;
    this.position.y = this.startY;

    if (import.meta.env.DEV) {
      this.gui = new GUI();
      this.gui.add(this, "rotationSpeed").name("Rotation speed");
      this.gui.add(this, "easingFactor").name("Easing factor");
    }
  }

  animate() {
    if (this.position.y < this.targetY) {
      this.position.y += this.speed;
      this.speed *= this.easingFactor;
    }

    if (this.gltf) {
      this.gltf.scene.position.y = this.position.y;
      this.gltf.scene.rotation.y += this.rotationSpeed;
    }

    window.requestAnimationFrame(() => this.animate());
  }
}
