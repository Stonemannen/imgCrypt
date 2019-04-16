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

//in which order to read the hidden message
var readOrder = []

Jimp.read(options.image)
  .then(image => {
    // Loop over all chars in message and manipulate pixels
    for (var i = 0; i < options.message.length; i++) {
      var x = getRandomArbitrary(0, image.bitmap.width)
      var y = getRandomArbitrary(0, image.bitmap.height)
      var originalColor = Jimp.intToRGBA(image.getPixelColor(x, y))
      //make pixel not stand out if original pixel is missing red
      if(originalColor.r < 70){
        var caesar = getRandomArbitrary(-10, 10);
      }else {
        var caesar = getRandomArbitrary(0, 100);
      }
      image.setPixelColor(Jimp.rgbaToInt(Number(options.message[i].charCodeAt(0)) + caesar, originalColor.g, originalColor.b, originalColor.a), x, y)
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
    //save readOrder to file
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