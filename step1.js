const fs = require('fs');
const process = require('process');

function cat (path) {
    console.log(fs.readFileSync(path, 'utf8'));
}

process.argv.forEach((val, index) => {
  try {
    if (index > 1) {
      cat(val);
    } 
  } catch (err) {
    console.log(`Error reading from ${val}:\n  ${err}`);
    process.exit(1);
  }
});
