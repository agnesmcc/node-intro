const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat (path) {
    console.log(fs.readFileSync(path, 'utf8'));
}

async function webCat (url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching ${url}:\n  ${error}`);
        process.exit(1);
    }
}

process.argv.forEach((val, index) => {
  try {
    if (index > 1) {
      if (val.slice(0, 4) === 'http') {
        webCat(val);
      } else {
        cat(val);   
      }
    } 
  } catch (err) {
    console.log(`Error reading from ${val}:\n  ${err}`);
    process.exit(1);
  }
});
