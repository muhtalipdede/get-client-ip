const http = require('http');

const customAgent = new http.Agent({ keepAlive: true, family: 4 });

const server = http.createServer({ agent: customAgent }, (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.split(',')[0];
    const response = {
        data: {
            clientIp: ip,
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
});

server.listen(3000, () => {
    console.log('Sunucu 3000 portunda dinleniyor...');
})