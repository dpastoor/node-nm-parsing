function printHelp() {
	//simple 'dumb way'
	console.log("nonmem parser (c) Devin Pastoor");
	console.log("");
	console.log("usage:");
	console.log("--help          print this help");
	console.log("--file={NAME}          read in file {NAME}");
	console.log("");
}

var args = require("minimist")(process.argv.slice(2), { string: "file"});
// slice first 2 as it would be node <filename> and don't care about those, so
// this way we'll caputure the remaining args


if (args.help || !args.file) {
	printHelp();
	process.exit(1);
	//since in global scope can't just return need to actually exit the process
	// can give a status code upon exiting (eg in this case 1)
}


var fileContents = require("./parse-lst.js");

fileContents.say(args.file).
val(function(contents) {
	var array = contents.toString().split("\n");
	for(var i in array) {
		console.log(i + " " + array[i]);
	}
})
.or(function(err) {
	console.error("Error" + err);
});
