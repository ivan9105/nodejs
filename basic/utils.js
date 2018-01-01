let util = require('util');

async function fn() {
    return await Promise.resolve('await promise resolve');
}

let callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret + '!!!');
});

function fn_() {
    return Promise.reject(null);
}

callbackFunction = util.callbackify(fn_);

callbackFunction((err, ret) => {
    err && err.hasOwnProperty('reason') && err.reason === null;
});