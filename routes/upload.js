var path = require('path');
var appDir = path.dirname(require.main.filename);

var express = require('express');
var router = express.Router();
var markdownpdf = require("markdown-pdf"),
 fs = require("fs");

router.post('/', function(req, res, next) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	
    	outFileName = filename.replace('.md','.pdf');
      res.setHeader('Content-disposition', 'attachment; filename=' + outFileName);
			res.setHeader('Content-type', 'application/pdf');

			writeStream = fs.createWriteStream(appDir+"/tmp/"+outFileName);
     	file.pipe(markdownpdf()).pipe(writeStream);
 
     	writeStream.on('close',function () {
     		res.sendFile(appDir+"/tmp/"+outFileName);
     	});
    });
});

module.exports = router;
