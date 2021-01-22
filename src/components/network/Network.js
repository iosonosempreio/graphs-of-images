import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
// import { json } from "d3";
import { Viewport } from "pixi-viewport";

const width = window.innerWidth, height = window.innerHeight;

let app = new PIXI.Application({
  backgroundColor: 0xf1f1f1,
  resolution: window.devicePixelRatio || 1,
});

const viewport = new Viewport({
  // center: new PIXI.Point(-width/2, -height/2),
  passiveWheel: false,
  stopPropagation: true,
  // divWheel: this._rootNode,
  screenWidth: width,
  screenHeight: height,
  worldWidth: width,
  worldHeight: height,
  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});
viewport
  // .clampZoom(Utilities.clampZoomOptions)
  .drag({pressDrag:true, clampWheel:true})
  .pinch()
  .wheel()
app.stage.addChild(viewport);

const container = new PIXI.Container();
viewport.addChild(container);

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

const spritesheetsList = Array.from( Array(15), (x,i)=>`images/spritesheets/spritesheet-${i+1}.json`)

spritesheetsList.forEach((d) => {
  app.loader.add(process.env.PUBLIC_URL + d);
  // app.loader.add(d.replace(".json", ".png"));
});
app.loader.onProgress.add((e) => {
  console.log(e.progress + "%");
});
app.loader.onComplete.add(async () => {
  console.log("loader completed", app.loader.resources);
  spritesheetsList.forEach((s) => {
    const sheet = app.loader.resources[s].spritesheet;
    for (let textureName in sheet.textures) {
      const texture = sheet.textures[textureName];
      const sprite = new PIXI.Sprite(texture);

      sprite.x = -container.width / 2 + Math.random() * container.width;
      sprite.y = -container.height / 2 + Math.random() * container.height;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      const scale = Math.min(50 / texture.orig.width, 100 / texture.orig.height);
      sprite.scale.x = scale;
      sprite.scale.y = scale;

      container.addChild(sprite);
    }
  });
});
app.loader.load();

function Network() {
  const container = useRef();
  useEffect(() => {
    container.current.appendChild(app.view);
  }, []);

  return <div ref={container}></div>;
}

export default Network;
