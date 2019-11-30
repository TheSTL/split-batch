const fs = require('fs');
const splitInBatch = require('./index');

console.time("Time this");
fs.createReadStream('itcont_2018_20020411_20170529.txt')
  .pipe(splitInBatch({ matcher: null, mapper: null, maxSizeArrayLength: 100000}))
  .on('data', (data) => {
     console.log(data);
  })
  .on('close', () =>{
    console.timeEnd("Time this");        
  })
