const fs = require('fs-extra');
const ASQ = require('asynquence');
const _ = require('lodash');
require("asynquence-contrib"); // no need to expose

function readFile (filename) {
  var sq = ASQ();

  fs.readFile(filename, sq.errfcb());
  return sq;
}


function say (filename) {
  return readFile(filename);
}


function extractThetaLines (lines) {
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
  return lines.slice(startThetaBlock, endThetaBlock)
              .filter(function(e) {return e === 0 || e}); // filter blank rows
}

function parseThetas (thetaArray) {
  // should have array of thetas from extraThetaLines
  var thetas = [];
  thetaArray.splice(0, 1); //first element should be $THETA
  _.forEach(thetaArray, function(n, i) {
      var split = n.split(';').filter(function(e) {return e === 0 || e});
      var info = {
          thetaNum: i+1,
          thetaName: split[1].trim(),
          thetaInput: split[0].trim()
      };
      thetas.push(info);
  });
  return thetas;
}

function extractThetaResults (lines) {
  var thetaBlock, startThetaBlock, endThetaBlock;
  var start = /THETA - VECTOR OF FIXED EFFECTS PARAMETERS/
  var end = /OMEGA - COV MATRIX FOR RANDOM EFFECTS - ETAS/
  for(var i in lines) {
    // block to extract start and end theta blocks
    //find the $THETA line and go to first omega
      if(start.test(lines[i])) {
        startThetaBlock = i;
        for (var j = i; j < lines.length-1; j++) {
          if (end.test(lines[j])) {
            endThetaBlock = j;
            break;
          }
        }
      }
  }
  return lines.slice(startThetaBlock, endThetaBlock)
}


function parseThetaValues (lines) {
  var results = []
  var values = lines.filter(function(line) {
    return /^\d/.test(line.trim());
  });
  _.forEach(values, function(line) {
    results.push(line.trim().split(/\s+/));
  });
  return _.flatten(results);
}

module.exports.say = say;
module.exports.extractThetaLines = extractThetaLines;
module.exports.extractThetaResults = extractThetaResults;
module.exports.parseThetas = parseThetas;
module.exports.parseThetaValues = parseThetaValues;
