process.argv.forEach(function(value, index, args){

	console.log('process.argv['+index+']='+value);
});


console.log(__filename);
console.log(__dirname);


console.log("---------------");
console.log('currentWorking=>'+process.cwd());

