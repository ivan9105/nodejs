let vm = require('vm');
let x = 1;
let vm_box = { x: 5 };
vm.createContext(vm_box);

let code = 'x += 40; var y = 17; function sum() { return x + y; }';
vm.runInContext(code, vm_box);

console.log(vm_box.x);
console.log(vm_box.y);
console.log(vm_box.sum());
console.log(x);

