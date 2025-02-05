import Model from "./model";

export default class Sword extends Model {
  constructor(options) {
    super(options);
    this.startY = options.position.y - 1;
    this.targetY = options.position.y + 3;
    this.speed = options.speed ?? 0.02;
    this.rotationSpeed = Math.PI / 120;
    this.easingFactor = 0.99;
    this.position.y = this.startY;
    this.animationActive = true;
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
  }
}
