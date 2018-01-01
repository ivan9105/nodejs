let zlib = require('zlib');
let fs = require('fs');
let http = require('http');

let gzip = zlib.createGzip();
const input = fs.createReadStream('text.txt');
const out = fs.createWriteStream('text.txt.gz');
input.pipe(gzip).pipe(out);

const request = http.get({ host: 'example.com',
    path: '/',
    port: 80,
    headers: { 'Accept-Encoding': 'gzip,deflate' } });

request.on('response', (response) => {
    let output = fs.createWriteStream('example.com_index.html');
    switch (response.headers['content-encoding']) {
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});