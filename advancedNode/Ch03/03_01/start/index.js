const { createServer } = require('http')
const { stat, createReadStream } = require('fs');
const fileName = '../../powder-day.mp4';
const { promisify } = require('util');
const fileInfo = promisify(stat);

createServer(async (req, res) => {

    const { size } = await fileInfo(fileName);
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'video/mp4'
    });
    createReadStream(fileName).pipe(res);


}).listen(3000, () => console.log('server running at 3000'))