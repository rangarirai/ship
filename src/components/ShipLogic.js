import { Vector } from "p5";
export default function ShipLogic(ship, p5) {
  this.ship = ship;
  this.r = 50;
  //50 is this.r
  this.pos = p5.createVector(p5.width / 2 - 50, p5.height / 2 - 50);
  this.heading = 0;
  this.rotation = 0;
  this.vel = p5.createVector(0, 0);
  this.isBoosting = false;
  this.up = false;
  this.boosting = function (b, up) {
    this.isBoosting = b;
    this.up = up;
  };
  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.95);
  };
  this.setRotation = function (a) {
    this.rotation = a;
  };
  this.render = function () {
    p5.push();
    p5.imageMode(p5.CENTER);
    p5.translate(this.pos.x, this.pos.y);
    p5.rotate(this.heading + p5.PI / 2);
    p5.image(this.ship, 0, 0, this.r * 2, this.r * 2);
    p5.pop();
  };
  this.edges = function () {
    if (this.pos.x > p5.width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = p5.width + this.r;
    }
    if (this.pos.y > p5.height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = p5.height + this.r;
    }
  };
  this.boost = function (d) {
    var force = Vector.fromAngle(this.heading);
    force.mult(0.2);
    if (this.up) {
      this.vel.add(force);
    } else {
      this.vel.sub(force);
    }
  };
  this.turn = function () {
    this.heading += this.rotation;
  };
}
