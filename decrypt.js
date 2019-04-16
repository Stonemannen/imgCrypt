var Jimp = require('jimp');
var fs = require('fs')

const optionDefinitions = [{
  name: 'image',
  alias: 'i',
  type: String,
  defaultOption: true
},
{
  name: 'key',
  alias: 'k',
  type: String
}
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var readOrder = JSON.parse(fs.readFileSync(options.key, "utf8"))

Jimp.read(options.image)
  .then(image => {
    var hidden = ""
    for(var i = 0; i < readOrder.length; i++){
        hidden += String.fromCharCode(Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).r - readOrder[i].caesar)
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