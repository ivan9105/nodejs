const assert = require('assert');

const customerJson1 = {
    customer: {
        name: 'Ivan'
    }
};

const customerJson2 = {
    customer: {
        name: 'Boris'
    }
};

const customerJson3 = {
    customer: {
        name: 'Boris'
    }
};

const customerJson4 = Object.create(customerJson1);

assert.deepEqual(customerJson1, customerJson1);
try {
    assert.deepEqual(customerJson1, customerJson2);
} catch (error) {
    console.log('Assertion error, compare: ' + JSON.stringify(customerJson1) + ' and ' + JSON.stringify(customerJson2));
}
assert.deepEqual(customerJson3, customerJson2);

assert.notDeepEqual(customerJson1, customerJson2);

const date = new Date();
const object = {};
const fakeDate = {};

Object.setPrototypeOf(fakeDate, Date.prototype);

//don't check prototype
assert.deepEqual(date, fakeDate);
try {
    assert.deepStrictEqual(date, fakeDate);
} catch (error) {
    console.log('Assertion error: ' + error);
}

assert.equal(1, 1);
assert.equal(1, '1');
try {
    assert.fail(1, 2, '1 not equal 2');
} catch (error) {
    console.log('Assertion error: ' + error);
}
assert.ifError(0);

const value1 = 0;
const value2 = -value1;
try {
    assert.notStrictEqual(value1, value2);
} catch (error) {
    console.log('Assertion error: ' + error);
}

const str1 = 'str1';
const str2 = 'str1';
try {
    assert.strictEqual(str1 / 1, str2 / 1);
} catch (error) {
    console.log('Assertion error: ' + error);
}
assert(Object.is(str1 / 1, str2 / 1));