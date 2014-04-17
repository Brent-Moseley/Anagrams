// Solution to Kata 6, part I:  http://codekata.com/kata/kata06-anagrams
// Refactoring:  re-write with a more flexible algorithm - do not require using all the letters in anagram words. 

// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var word = process.argv[2];
//var perm = new Object();
// perm.permArr = [];
// perm.usedChars = [];   // Used in recursive permute routine below.

fs.readFile('/usr/share/dict/words', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var ALL_WORDS = data;
  var hash = new Object();

  hash = make_array (ALL_WORDS);
  show_anagrams (word, hash);
  return;
});


function show_anagrams (word, hash) {
  // Compare the word with each key in the hash to see if we could make that key from the letters in word.
  var word_count = 0;
  for (var k = 0; k < hash.length; k++) {    
  	if (can_make(hash[k], word) && word != hash[k] && hash[k] != '') {
      // This key can be made, display it as one possible.
      report (hash[k]);
      word_count++;
    }
  }

  console.log ("Total words: " + word_count.toString());
  return;
}


function report (word) {
  console.log ("Word found: " + word);
}


function can_make (key, word) {
  var pos;
  
  // Make an array of all letters in word, as well as key
  var letters = word.split('');
  var word_array = key.split('');
  for (var i = 0; i < word_array.length; i++) {
    // Attempt to find current letter in letters
  	pos = letters.indexOf(word_array[i]);
  	if (pos == -1) return false;   // a letter was missing, could not make key
  	letters.splice(pos, 1);        // remove the used letter
  }
  // Completed word_array, key successfully created.
  return true;
}


function make_array (data) {
  return data.split('\n');
}
