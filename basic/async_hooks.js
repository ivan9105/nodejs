const async_hooks = require('async_hooks');
// const eid1 = async_hooks.executionAsyncId();
// console.log('Current execution context id: ' + eid1);
// const tid1 = async_hooks.triggerAsyncId();
// console.log('Handle responsible for triggering callback id: ' + tid1);
//
// const asyncHook1 = async_hooks.createHook({init, before, after, destroy, promiseResolve});
// asyncHook1.enable();
// asyncHook1.disable();
// function init(asyncId, type, triggerAsyncId, resource) {
//     console.log('Init');
// }
// function before(asyncId) {
//     console.log('Before');
// }
// function after(asyncId) {
//     console.log('After');
// }
// function destroy(asyncId) {
//     console.log('Destroy');
// }
// function promiseResolve(asyncId) {
//     console.log('Promise resolve');
// }

const fs = require('fs');
const util = require('util');
let indent = 0;

const asyncHook2 = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        const eid = async_hooks.executionAsyncId();
        const indentStr = ' '.repeat(indent);
        fs.writeSync(1, `${indentStr}${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
    before(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(1, `${indentStr}before:  ${asyncId}\n`);
        indent += 2;
    },
    after(asyncId) {
        indent -= 2;
        const indentStr = ' '.repeat(indent);
        fs.writeSync(1, `${indentStr}after:   ${asyncId}\n`);
    },
    destroy(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(1, `${indentStr}destroy: ${asyncId}\n`);
    }
});

asyncHook2.enable();

const net = require('net');
net.createServer(() => {}).listen(8080, () => {
    setTimeout(() => {
        console.log('>>>', async_hooks.executionAsyncId());
    }, 10);

    setTimeout(() => {
        console.log('<<<', async_hooks.executionAsyncId());
    }, 10);
});