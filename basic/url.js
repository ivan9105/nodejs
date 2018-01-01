let { URL } = require('url');
let url_ = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(url_);
console.log(url_.hash);
