const crypto = require('crypto');
const fs = require('fs');
const cipher = crypto.createCipher('aes192', 'a password');
const decipher = crypto.createDecipher('aes192', 'a password');

let secret = 'secret';
const hash = crypto.createHmac('sha256', secret)
                    .update('This is my secret')
                    .digest('hex');
console.log(hash);

let certificate1 = new crypto.Certificate();
console.log(certificate1);

let input = fs.createReadStream('console.js');
let output = fs.createWriteStream('console.enc');

input.pipe(cipher).pipe(output);

let decrypted = '';
decipher.on('readable', () => {
    const data = decipher.read();
    if (data) {
        decrypted += data.toString('utf8');
    }
});

decipher.on('end', () => {
    console.log(decrypted);
});

const encrypted =
    'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
decipher.write(encrypted, 'hex');
decipher.end();

input = fs.createReadStream('console.enc');
output = fs.createWriteStream('console_decrypted.js');

input.pipe(decipher).pipe(output);