let january = new Date(9e8);
let english = new Intl.DateTimeFormat('en', { month: 'long' });
let russian = new Intl.DateTimeFormat('ru', { month: 'long' });

console.log(english.format(january));
console.log(russian.format(january));