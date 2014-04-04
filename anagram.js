// Solution to Kata 6, part I:  http://codekata.com/kata/kata06-anagrams

// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var ALL_WORDS = [];


// Read in the weather data file, calculating results when read. 
fs.readFile('/usr/share/dict/words', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  show_words (data);
  return;
});


function show_words (data) {
  var separate = data.split('\n');
  for (var i = 0; i < 50; i++) {
  	console.log (separate[i]);
  }
}
