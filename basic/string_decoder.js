let { StringDecoder } = require('string_decoder');
let decoder = new StringDecoder('utf8');
let buffer = Buffer.from([0xC2, 0xA2]);
console.log(decoder.write(buffer));
const buffer2 = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(decoder.write(buffer2));
