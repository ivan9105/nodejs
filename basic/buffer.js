//basic
const buffer1 = Buffer.alloc(10);
console.log(buffer1);

const buffer2 = Buffer.alloc(10, 2);
console.log(buffer2);

const buffer3 = Buffer.allocUnsafe(10);
console.log(buffer3);
buffer3.fill();
console.log(buffer3);
buffer3.write('Test');
console.log(buffer3);

const buffer4 = Buffer.from([1, 2, 3]);
console.log(buffer4);

const buffer5 = Buffer.from('Тест');
console.log(buffer5);

const buffer6 = Buffer.from('Тест', 'latin1');
console.log(buffer6);

let buffer7 = Buffer.from('Тест', 'ascii');
console.log(buffer7.toString());
buffer7 = Buffer.from('Тест', 'utf-8');
console.log(buffer7.toString());
console.log(buffer7.toString('hex'));
console.log(buffer7.toString('base64'));

let arr = new Uint8Array(5);
arr[0] = 5000;
arr[1] = 4000;
arr[2] = 3000;
arr[3] = 2000;
arr[4] = 1000;

//diff between shared or copied buffer
const copiedBuffer = Buffer.from(arr);
const pointerBuffer = Buffer.from(arr.buffer);
console.log('Copied buffer: ');
console.log(copiedBuffer);
console.log('Shared buffer: ');
console.log(pointerBuffer);

arr[0] = 6000;
arr[1] = 6000;
arr[2] = 6000;
arr[3] = 6000;
arr[4] = 6000;
console.log('Copied buffer: ');
console.log(copiedBuffer);
console.log('Shared buffer: ');
console.log(pointerBuffer);

//shared buffer interval sample
let arr1 = new Uint16Array(20);
let buffer8 = Buffer.from(arr1.buffer, 0, 16);
console.log(buffer8.length);

//print buffer values
let buffer9 = Buffer.from([1, 2, 3]);
for (let b of buffer9) {
    console.log(b);
}

