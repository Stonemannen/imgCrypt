var Jimp = require('jimp');
var fs = require('fs')

var args = process.argv.slice(2);

var readOrder = []

Jimp.read(args[0])
  .then(image => {
    // Do stuff with the image.
    for(var i = 0; i < args[1].length; i++){
      var x = getRandomArbitrary(0, image.bitmap.width)
      var y = getRandomArbitrary(0, image.bitmap.height)
      var caesar = getRandomArbitrary(0, 100);
      image.setPixelColor(Jimp.rgbaToInt(Number(args[1][i].charCodeAt(0))+caesar, Number(args[1][i].charCodeAt(0))+caesar, Number(args[1][i].charCodeAt(0))+caesar, 100), x, y)
      readOrder.push({x: x, y: y, caesar: caesar})
    }
    image.quality(100);
    image.write('lena-small-bw.png');
  }).then(() => {
    fs.writeFileSync('key.key', JSON.stringify(readOrder), 'utf-8')
  })
  .catch(err => {
    // Handle an exception.
    console.log(err)
  });


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}