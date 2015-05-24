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


function parseTheta (lines) {
	var thetaBlock, startThetaBlock, endThetaBlock;
	for(var i in lines) {
		// block to extract start and end theta blocks
		//find the $THETA line and go to first omega
			if(/\$THETA/.test(lines[i])) {
				startThetaBlock = i;
				for (var j = i; j < lines.length-1; j++) {
					if (/\$OMEGA/.test(lines[j])) {
						endThetaBlock = j;
						break;
					}
				}
			}
	}
	console.log("start Theta: " + startThetaBlock + " end Theta: " + endThetaBlock);
  return lines.slice(startThetaBlock, endThetaBlock);
}

module.exports.say = say;
module.exports.parseTheta = parseTheta;
