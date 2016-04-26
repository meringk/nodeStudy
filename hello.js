var express=require('express');
var fs=require('fs');
var app=express();

app.listen(3000,function(){
	console.log('서버 시작됨 3000 포트');
});

app.get('/',function(req,res){
	fs.readFile('index.html',function(error,data){
		if(error){
			console.log(error);
		}else{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		}
	});
	fs.readFile('index.css',function(error,data){
		if(error){
			console.log(error);
		}else{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		}
	});
});
