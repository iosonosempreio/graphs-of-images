import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { json, scaleLinear, extent } from "d3";
import { Viewport } from "pixi-viewport";

const width = window.innerWidth,
  height = window.innerHeight,
  size = scaleLinear();
let nodes, hashtags, missings;

let app = new PIXI.Application({
  backgroundColor: 0xf1f1f1,
  resolution: window.devicePixelRatio || 1,
  autoResize:true,
  width: width,
  height: height,
  antialias: true,
  powerPreference: 'high-performance',
  resizeTo: window
});

const viewport = new Viewport({
  passiveWheel: false,
  stopPropagation: true,
  screenWidth: width,
  screenHeight: height,
  worldWidth: width,
  worldHeight: height,
  interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});
viewport.drag({ pressDrag: true, clampWheel: true }).pinch().wheel();
app.stage.addChild(viewport);

const graphicsContainer = new PIXI.Container();
// Move container to the center
graphicsContainer.x = app.screen.width / 2;
graphicsContainer.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
graphicsContainer.pivot.x = graphicsContainer.width / 2;
graphicsContainer.pivot.y = graphicsContainer.height / 2;

viewport.addChild(graphicsContainer);

const container = new PIXI.ParticleContainer();

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

viewport.addChild(container);

const spritesheetsList = Array.from(
  Array(4),
  (x, i) => `${process.env.PUBLIC_URL}/images/spritesheets/spritesheet-${i + 1}.json`
);

spritesheetsList.forEach((d) => {
  app.loader.add(d);
});
app.loader.onProgress.add((e) => {
  console.log(e.progress + "%");
});

app.loader.onComplete.add(async () => {
  console.log("loader completed", app.loader.resources);

  const graphics = new PIXI.Graphics();
  missings.forEach(m=>{
    const my_size = size(m.size);
    graphics.lineStyle(1, 0x000000, 1);
    // graphics.beginFill(0xDE3249);
    graphics.drawRect(m.x - my_size/2, m.y - my_size/2, my_size, my_size);
    const l1_x1 = m.x - my_size/2,
          l1_y1 = m.y - my_size/2,
          l1_x2 = m.x + my_size/2,
          l1_y2 = m.y + my_size/2;
    graphics.moveTo(l1_x1, l1_y1);
    graphics.lineTo(l1_x2, l1_y2);
    const l2_x1 = m.x + my_size/2,
          l2_y1 = m.y - my_size/2,
          l2_x2 = m.x - my_size/2,
          l2_y2 = m.y + my_size/2;
    graphics.moveTo(l2_x1, l2_y1);
    graphics.lineTo(l2_x2, l2_y2);
    graphics.closePath();
    // graphics.endFill();
    console.log('created graphic')
  })
  graphicsContainer.addChild(graphics);

  hashtags.forEach((h) => {
    let style = new PIXI.TextStyle({
      "fontSize": h.size,
      "fontFamily": "Arial",
      // fontStyle: "italic",
      // fontWeight: "normal",
      fill:"#333333"
    });
    style = h.size > 50 ? {
      ...style,
      fill: ["#ffffff", "#00ff99"], // gradient
      stroke: "#4a1850",
      strokeThickness: 5,
      // dropShadow: true,
      // dropShadowColor: "#000000",
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
      lineJoin: "round",
    } : style;
    const text = new PIXI.Text(h.label, style);
    text.x = h.x;
    text.y = h.y*-1;
    text.anchor.x = 0.5;
    text.alpha = h.size > 50 ? 1 : 0.5;
    // text.anchor.y = 0.5;
    graphicsContainer.addChild(text);
    console.log('created graphic')
  });

  spritesheetsList.forEach((s) => {
    const sheet = app.loader.resources[s].spritesheet;
    for (let textureName in sheet.textures) {
      // console.log(textureName)
      const texture = sheet.textures[textureName];
      const sprite = new PIXI.Sprite(texture);

      const nodeData = nodes.find((n) => n.attributes.image === textureName);
      let scale = 1;
      if (nodeData) {
        sprite.x = nodeData.x;
        sprite.y = nodeData.y*-1;
        scale = Math.min(
          size(nodeData.size) / texture.orig.width,
          size(nodeData.size) / texture.orig.height
        );
      } else {
        sprite.x = 0;
        sprite.y = 0;
        scale = Math.min(
          50 / texture.orig.width,
          50 / texture.orig.height
        );
      }

      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.scale.x = scale;
      sprite.scale.y = scale;

      container.addChild(sprite);
      console.log('created sprite')
    }
  });
  console.log('all elements created. Rendering...')
});

function Network() {
  const container = useRef();
  useEffect(() => {
    json(process.env.PUBLIC_URL + "/data.json").then((data) => {
      nodes = data.nodes.filter((n) => n.attributes.type === "post");
      hashtags = data.nodes.filter((n) => n.attributes.type === "hashtag");
      missings = data.nodes.filter((n) => n.attributes.type === "postNoImage");
      size.domain(extent(nodes, d=>d.size)).range([35,200])
      container.current.appendChild(app.view);
      app.loader.load();
    });
  }, []);

  return <div ref={container}></div>;
}

export default Network;
