const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat (path, outfile) {
  try {
    let data = fs.readFileSync(path, 'utf8');
    if (outfile) {
        fs.writeFileSync(outfile, data);
    } else {
        console.log(data);
    }
  } catch (err) {
    console.log(`Error reading from ${path}:\n  ${err}`);
    process.exit(1);
  }
}

async function webCat (url, outfile) {
  try {
      const response = await axios.get(url);
      data = response.data
      if (outfile) {
          fs.writeFileSync(outfile, data);
      } else {
          console.log(data);
      }
  } catch (error) {
      console.error(`Error fetching ${url}:\n  ${error}`);
      process.exit(1);
  }
}

if (process.argv[2] === '--out') {
  console.log('writing to file...');
  let outfile = process.argv[3];
  let input = process.argv[4];
  if (input.slice(0, 4) === 'http') {
    webCat(input, outfile);
  } else {
    cat(input, outfile);
  }

} else if (process.argv.length === 3) {
  let input = process.argv[2];
  if (input.slice(0, 4) === 'http') {
    webCat(input);
  } else {
    cat(input);
  }
}