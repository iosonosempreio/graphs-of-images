(this["webpackJsonpgraphs-of-images"]=this["webpackJsonpgraphs-of-images"]||[]).push([[0],{68:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var r,i=n(9),o=n(10),a=n.n(o),c=n(31),s=n.n(c),d=(n(68),n(13)),h=n.n(d),u=n(32),l=n(0),p=n(39),g=n(35),f=window.innerWidth,w=window.innerHeight,m=new l.Application({backgroundColor:15856113,resolution:window.devicePixelRatio||1,width:f,height:w}),v=new g.a({passiveWheel:!1,stopPropagation:!0,screenWidth:f,screenHeight:w,worldWidth:f,worldHeight:w,interaction:m.renderer.plugins.interaction});v.clampZoom({minScale:.1,maxScale:10}).drag({pressDrag:!0,clampWheel:!0}).pinch().wheel(),m.stage.addChild(v);var x=new l.Container;v.addChild(x),x.x=m.screen.width/2,x.y=m.screen.height/2,x.pivot.x=x.width/2,x.pivot.y=x.height/2;var j=Array.from(Array(15),(function(e,t){return"images/spritesheets/spritesheet-".concat(t+1,".json")}));j.forEach((function(e){m.loader.add("/graphs-of-images"+e)})),m.loader.onProgress.add((function(e){console.log(e.progress+"%")})),m.loader.onComplete.add(Object(u.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("loader completed",m.loader.resources),j.forEach((function(e){var t=m.loader.resources[e].spritesheet,n=function(e){var n=t.textures[e],i=new l.Sprite(n),o=r.find((function(t){return t.attributes.image===e}));o?(i.x=.5*o.x,i.y=.5*o.y):(i.x=0,i.y=0),i.anchor.x=.5,i.anchor.y=.5;var a=Math.min(50/n.orig.width,100/n.orig.height);i.scale.x=a,i.scale.y=a,x.addChild(i)};for(var i in t.textures)n(i)}));case 2:case"end":return e.stop()}}),e)}))));var b=function(){var e=Object(o.useRef)();return Object(o.useEffect)((function(){Object(p.a)("/graphs-of-imagesdata.json").then((function(t){r=t.nodes.filter((function(e){return"post"===e.attributes.type})),e.current.appendChild(m.view),m.loader.load()}))}),[]),Object(i.jsx)("div",{ref:e})};n(79);var y=function(){return Object(i.jsx)("div",{className:"App",children:Object(i.jsx)(b,{})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,81)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),o(e),a(e)}))};s.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(y,{})}),document.getElementById("root")),C()}},[[80,1,2]]]);
//# sourceMappingURL=main.88040c55.chunk.js.map