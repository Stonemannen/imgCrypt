var Jimp = require('jimp');
var fs = require('fs')

var args = process.argv.slice(2);

var readOrder = JSON.parse(fs.readFileSync(args[1], "utf8"))

Jimp.read(args[0])
  .then(image => {
    // Do stuff with the image.
    var hidden = ""
    for(var i = 0; i < readOrder.length; i++){
        hidden += String.fromCharCode((Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).r + Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).g + Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).g - (readOrder[i].caesar * 3))/3)
    }
    console.log(hidden)
  })
  .catch(err => {
    // Handle an exception.
    console.log(err)
  });


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}