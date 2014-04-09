// Solution to Kata 6, part I:  http://codekata.com/kata/kata06-anagrams

// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var word = process.argv[2];
var perm = new Object();
perm.permArr = [];
perm.usedChars = [];   // Used in recursive permute routine below.

console.log (arguments[0]);
// Read in the weather data file, calculating results when read. 
fs.readFile('/usr/share/dict/words', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var ALL_WORDS;
  ALL_WORDS = data;
  var hash = new Object();

  make_array (ALL_WORDS, hash);
  show_anagrams (word, hash);
  return;
});


function show_anagrams (word, hash) {
  permute (word);

  // Attempt to do a lookup of each letter combination in the total words hash
  for (var i = 0; i < perm.permArr.length; i++) {
  	if (hash.hasOwnProperty(perm.permArr[i])) console.log ("+" + perm.permArr[i]);
  }

  return;

}

// produce all combinations letters in input, returning array
function permute(input) {
  var i, ch, chars = input.split("");
  for (i = 0; i < chars.length; i++) {
    ch = chars.splice(i, 1);
    perm.usedChars.push(ch);
    if (chars.length == 0) { 
      perm.permArr[perm.permArr.length] = perm.usedChars.join("");
    }  
    permute(chars.join(""));
    chars.splice(i, 0, ch);
    perm.usedChars.pop();
  }
  return perm.permArr
};


function make_array (data, hash) {
  var separate = data.split('\n');
  for (var i = 0; i < separate.length; i++) {
  	hash[separate[i]] = '.';
  }
  return;
}
