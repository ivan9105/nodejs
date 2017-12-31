let os = require('os');
console.log('EOL: ' + os.EOL);
console.log('ARCH: ' + os.arch());
console.log('CPUS: ' + JSON.stringify(os.cpus()));