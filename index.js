const throught = require('through');
const Decoder = require('string_decoder').StringDecoder;

function splitInBatch ({ matcher, mapper, maxSizeArrayLength }) {
  const decoder = new Decoder();
  maxSizeArrayLength = maxSizeArrayLength ? maxSizeArrayLength : 1;
  let inMemoryData = [];
  if (!matcher) {
    matcher = /\r?\n/
  }

  function emit (stream) {
    let piece = inMemoryData.splice(0, maxSizeArrayLength);

    if (mapper && 'function' === typeof mapper) {
      try {
        piece = mapper(piece);
      } catch (err) {
        return stream.emit('error', err);
      }
      if('undefined' !== typeof piece)
        stream.queue(piece)
    } else {
      stream.queue(piece);
    }

  }

  function next (stream, buffer) {
    const pieces = buffer.split(matcher);
    inMemoryData = inMemoryData.concat(pieces);
    
    while(inMemoryData.length>maxSizeArrayLength){
      emit(stream);
    }
  }

    return throught(function write(data) {
      next(this, decoder.write(data));
    }, function end () {
      this.queue(inMemoryData);
      this.queue(null);
    });
  
}

module.exports = splitInBatch;