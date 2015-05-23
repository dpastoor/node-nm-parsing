const fs = require('fs');
const ASQ = require('asynquence');
require("asynquence-contrib"); // no need to expose

function readFile (filename) {
  var sq = ASQ();

  fs.readFile(filename, sq.errfcb());
  return sq;
}


function say (filename) {
  return readFile(filename);
}

module.exports.say = say;
