let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('How to quit java and go to web? ', (answer) => {
    console.log(`You answer: ${answer}`);
    rl.close();
});