var fs = require('fs');
var { promisify } = require('util');
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var beep = () => process.stdout.write("\x07");
var delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
})
var readdir = promisify(fs.readdir);

Promise.all([
  writeFile('readme.md', 'Hello World'),
  writeFile('readme.txt', 'Hello World'),
  writeFile('readme.json', 'Hello World'),
]).then(() => readdir(__dirname)).then(console.log);