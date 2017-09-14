const fs = require('fs');

function writeFile(jsonData,path){
	if(fs.existsSync(path)){
		fs.unlinkSync(path);
	}

	fs.writeFile(path, jsonData, {flag: 'a'}, function (err) {
		if(err) {
			console.error(err);
		} else {
			console.log('write sucess:'+ path);
		}
	});

}
exports.writeFile = writeFile;