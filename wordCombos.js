// Solution to Kata 8, part I:  http://codekata.com/kata/kata08-conflicting-objectives
// Exercise version:  optimized for speed
// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var WORD_LIST = new Object();

fs.readFile('/usr/share/dict/words', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  WORD_LIST.list = data;

  var both = make_array();
  WORD_LIST.all = both.all;
  WORD_LIST.sixes = both.sixes;
  find_combos();
  return;
});


function find_combos () {
  // Go through each word that is of length six, trying all possible "split points".  For each split point,
  // determine if BOTH sides are a legitimate word. 
  for (var k = 0; k < WORD_LIST.sixes.length; k++) {  
    var len = WORD_LIST.sixes[k].length;
  	
    for (var j = 0; j < len-1; j++) {
      var left = WORD_LIST.sixes[k].substring(0, j+1);
      var right = WORD_LIST.sixes[k].substring(j+1, len);
      if (valid_words(left, right)) console.log (left + ' + ' + right + ' => ' + WORD_LIST.sixes[k]);  
    } 

  }

  return;
}

function valid_words (word1, word2) {
  var first = valid (word1);
  var second = valid (word2);
  return (first && second);
}

function valid (word) {
  for (var i = 0; i < WORD_LIST.all.length; i++) {
    if (WORD_LIST.all[i] == word) return true;
  }
  return false;
  // Additional speed refinement:  binary search.
}


function make_array () {
  var all = WORD_LIST.list.split('\n');
  var final = new Array();
  var size_six = new Array();
  var both = new Object();
  // Create two arrays: one with words of exactly six letters (since we only want to create words of that length),
  // plus a second array of all words less then length 6, which will be used as the left and right parts. 
  for (var i = 0; i < all.length; i++) {
    if (all[i].length < 6) final.push(all[i]);
    if (all[i].length == 6) size_six.push(all[i]);      
  }
  both.all = final;
  both.sixes = size_six;
  return both;
}
