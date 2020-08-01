const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname ="localhost";
const port = 3000;

const server = http.createServer((req, res) => {
	console.log('request for' +req.url + 'by method' +req.method );
	if(req.method == 'GET')
	{
		var fileURL;
    	if (req.url == '/') {
        	//res.write('<h1>Server connection success</h1>');
        	fileURL = "/index.html"
  		  }
  		  else
  		  {
  		  	fileURL= req.url }

  		 var filePath = path.resolve('./nodejs'+fileURL);

  		 const fileExt = path.extname(filePath);

  		 if(fileExt == '.html')
  		 {
  		 	fs.exists(filePath,(exists)=>{
  		 		if(!exists)
  		 		{
  		 			res.statuscode=404;
  		 			res.setHeader('Content-Type','text/html');
  		 			res.end('<html> <body><h1> error 404:' + fileURL +'does not exist </h1> </body></html>');

  		 		}

  		 		res.statuscode=200;
  		 		res.setHeader('Content-Type','text/html');
  		 		fs.createReadStream(filePath).pipe(res);

  		 	})
  		 }
  		 else
  		 {
  		 	res.statuscode=404;
  		 			res.setHeader('Content-Type','text/html');
  		 			res.end('<html> <body><h1> error 404:' + fileURL +'not a html file </h1> </body></html>');

  		 }
  	}
  	res.statuscode=404;
  	res.setHeader('Content-Type','text/html');
  	res.end('<html> <body><h1> error 404:' + fileURL +' is not supported </h1> </body></html>');
  // res.end();
});

 server.listen(port, hostname , ()=>{
	console.log(`server running at http://${hostname}:${port}`);
});
// 