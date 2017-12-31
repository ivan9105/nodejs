const dns = require('dns');
dns.lookup('yandex.ru', (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family);
});

dns.resolve4('archive.org', (err, addresses) => {
    if (err) {
        throw err;
    }

    console.log(`addresses: ${JSON.stringify(addresses)}`);

    addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
            if (err) {
                throw err;
            }
            console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
        });
    });
});

dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
    console.log(hostname, service);
});