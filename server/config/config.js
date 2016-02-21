var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
	development:{
		rootPath: rootPath,
		//db: "mongodb://localhost/blogram",
		db: "mongodb://admin:admin@ds013738.mongolab.com:13738/blogram",
		port: process.env.PORT || 3000
	},
	production:{
		rootPath: rootPath,
		db: "mongodb://admin:admin@ds013738.mongolab.com:13738/blogram",
		port: process.env.PORT || 80
	},
	secretKey	: ""
}
