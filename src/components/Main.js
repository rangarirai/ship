import React, { useEffect } from "react";
import * as p5 from "p5";

import shipImg from "../ship.png";
import spaceImg from "../space.jpg";
import ShipLogic from "./ShipLogic";

const Main = () => {
  const Sketch = (p5) => {
    let ship;
    let shipLogic;
    let space;
    let container;
    p5.preload = () => {
      ship = p5.loadImage(shipImg);
      space = p5.loadImage(spaceImg);
    };

    p5.setup = () => {
      // p5.imageMode(p5.CENTER);
      container = p5.select("main");
      p5.createCanvas(container.size().width, container.size().height);
      p5.background(0);
      shipLogic = new ShipLogic(ship, p5);
    };
    p5.windowResized = () => {
      p5.resizeCanvas(container.size().width, container.size().height);
      p5.background(0);
    };

    p5.draw = () => {
      p5.image(space, 0, 0, p5.width, p5.height);
      shipLogic.render();
      shipLogic.turn();
      shipLogic.update();
      shipLogic.edges();
    };

    p5.keyReleased = () => {
      shipLogic.setRotation(0);
      shipLogic.boosting(false);
    };

    p5.keyPressed = () => {
      if (p5.keyCode === p5.RIGHT_ARROW) {
        shipLogic.setRotation(0.1);
      } else if (p5.keyCode === p5.LEFT_ARROW) {
        shipLogic.setRotation(-0.1);
      } else if (p5.keyCode === p5.UP_ARROW) {
        shipLogic.boosting(true, true);
      } else if (p5.keyCode === p5.DOWN_ARROW) {
        shipLogic.boosting(true, false);
      }
    };
  };

  useEffect(() => {
    new p5(Sketch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Main;
