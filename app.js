var http=require('http')
var fs=require('fs')
var path=require('path')
var url=require('url')
http.createServer(function (req,res) {
	var urlObj=url.parse(req.url,true)
	console.log(urlObj)
	switch(urlObj.pathname){
		case '/loadmore':

		var length=urlObj.query.length
		var index=urlObj.query.index
		var data=[]
		for (var i = 0; i < length; i++) {
			data.push('新闻'+(parseInt(index)+i+1))
		}
		console.log(data)
		res.end(JSON.stringify(data))
		break;

		default:
		fs.readFile(path.join(__dirname,'static',urlObj.pathname),function (err,data) {
			if (err) {
				res.statusCode=404
				res.end('not found')
			} else {
				res.end(data)
			}
		});

	}

}).listen(8080)