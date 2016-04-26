var http = require('http');
var express = require('express');
var app=express();

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello world!');
}).listen(3000);

//app.get('/',function(req,res){
//	res.sendFile(__dirname+'index.html');
//})
console.log('서버 시작됨 3000 포트');

