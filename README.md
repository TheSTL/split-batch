# split-in-batch
Break up a stream and reassemble it so that each array is a collection of line. 
`split-in-batch` is inspired by [@dominictarr](https://github.com/dominictarr) split module.

Example:
```
fs.createReadStream(file)
  .pipe(splitInBatch({matcher: null, mapper: null, maxSizeArrayLength: 100000}))
  .on('data', (data) => {
     console.log(data);
  })
```

`matcher` : split-in-batch takes the same arguments as string.split except it defaults to '/\r?\n/'.

`maxSizeArrayLength` : return array size.