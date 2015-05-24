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
				for (var j = i; j < lines.length-1; j++) {
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

function thetaNums (lines){
	matches = [];
	var thetaPattern = /(TH\s\d\s)|(TH\d+)/g;
	var output = _.forEach(lines, function(line) {
		matches.push(line.match(thetaPattern));
	});
	console.log(_.flatten(matches
		.filter(function(e) {return e === 0 || e})
		)
	);
}
thetaNums(thetaResultsBlock);