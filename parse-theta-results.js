const fs = require('fs-extra');
const _ = require('lodash');

var thetaResults = fs.readFileSync("theta-results.txt")
			.toString()
			.split('\n');

function extractThetaResults (lines) {
	var thetaBlock, startThetaBlock, endThetaBlock;
	var start = /THETA - VECTOR OF FIXED EFFECTS PARAMETERS/
	var end = /OMEGA - COV MATRIX FOR RANDOM EFFECTS - ETAS/
	for(var i in lines) {
		// block to extract start and end theta blocks
		//find the $THETA line and go to first omega
			if(start.test(lines[i])) {
				startThetaBlock = i;
				for (var j = i; j < lines.length; j++) {
					if (end.test(lines[j])) {
						endThetaBlock = j;
						break;
					}
				}
			}
	}
	console.log("start Theta: " + startThetaBlock + " end Theta: " + endThetaBlock);
  return lines.slice(startThetaBlock, endThetaBlock)
}

var thetaResultsBlock = extractThetaResults(thetaResults);

//function thetaNums (lines){
//	matches = [];
//	var thetaPattern = /(TH\s\d\s)|(TH\d+)/g;
//	_.forEach(lines, function(line) {
//		matches.push(line.match(thetaPattern));
//	});
//	console.log(_.flatten(matches
//		.filter(function(e) {return e === 0 || e})
//		)
//	);
//}

function thetaValues (lines) {
	var results = []
	var values = lines.filter(function(line) {
		return /^\d/.test(line.trim());
	});
	_.forEach(values, function(line) {
		results.push(line.trim().split(/\s+/));
	});
	return _.flatten(results);
}

//thetaNums(thetaResultsBlock);
thetaValues(thetaResultsBlock);