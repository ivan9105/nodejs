console.count();
console.count('default');

console.count('test');
console.count('test');
console.countReset('test');
console.count('test');

console.time('for');
for (let i = 0; i < 1000000000; i++) {}
console.timeEnd('for');

console.trace('trace');