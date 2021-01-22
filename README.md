# Graphs of images
An attempt to display large network graphs with images as nodes.
Uses PIXI.js to leverage webgl.

[Demo](https://iosonosempreio.github.io/graphs-of-images/)

### Instructions
#### Make the network
Make the network in Gephi and export it as a JSON file.
Name it `data.json` and place it in the `public`folder.
#### Create the spritesheets with image thumbnails
Place all of your images (at full resolution) in the folder `public/images/originals`.
Install [ImageMagick](http://www.imagemagick.org/): `brew install imagemagick`.
Install Gamefroot Texture Packer: `npm install gamefroot-texture-packer -g` (or `yarn global add gamefroot-texture-packer`).
From the root run `gf-pack public/images/originals/*.jpg -p public/images/spritesheets --resizeWidth 256 --resizeHeight 256 --width 4096 --height 4096`
#### Run the prototype
Install the project dependencies (React, PIXI.js, d3.js): `npm i` (or `yarn`)
Enjoy the network.
