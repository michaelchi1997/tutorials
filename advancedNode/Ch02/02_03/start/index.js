const fs = require('fs');

const readStream = fs.createReadStream('../../powder-day.mp4');

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('end', () => console.log('Done'));

readStream.on('error', (error) => console.error(error));

readStream.pause();

process.stdin.on('data', (chunk) => {
    readStream.read();
})