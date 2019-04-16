var Jimp = require('jimp');
var fs = require('fs')

const optionDefinitions = [{
    name: 'image',
    alias: 'i',
    type: String,
    defaultOption: true
  },
  {
    name: 'message',
    alias: 'm',
    type: String
  },
  {
    name: 'key',
    alias: 'k',
    type: String
  },
  {
    name: 'output',
    alias: 'o',
    type: String
  }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var readOrder = []

console.log(options)

Jimp.read(options.image)
  .then(image => {
    // Do stuff with the image.
    for (var i = 0; i < options.message.length; i++) {
      var x = getRandomArbitrary(0, image.bitmap.width)
      var y = getRandomArbitrary(0, image.bitmap.height)
      var caesar = getRandomArbitrary(0, 100);
      image.setPixelColor(Jimp.rgbaToInt(Number(options.message[i].charCodeAt(0)) + caesar, Number(options.message[i].charCodeAt(0)) + caesar, Number(options.message[i].charCodeAt(0)) + caesar, 100), x, y)
      readOrder.push({
        x: x,
        y: y,
        caesar: caesar
      })
    }
    image.quality(100);
    if (options.output != undefined) {
      image.write(options.output);
    } else {
      image.write('image.png');
    }
    
  }).then(() => {
    if (options.key != undefined) {
      fs.writeFileSync(options.key, JSON.stringify(readOrder), 'utf-8')
    } else {
      fs.writeFileSync('hidden.key', JSON.stringify(readOrder), 'utf-8')
    }
  })
  .catch(err => {
    // Handle an exception.
    console.log(err)
  });


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}