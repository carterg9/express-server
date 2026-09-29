let fs = require('fs');
let zlib = require('zlib');

let readableStream = fs.createReadStream('input.html');
let writableStream = fs.createWriteStream('input.html.gz');

let readableStream2 = fs.createReadStream('input.html');
readableStream2.pipe(process.stdout);