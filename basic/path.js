let path = require('path');
console.log(process.env.PATH.split(path.delimiter));

console.log(path.extname('index.html'));

console.log(path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
}));

