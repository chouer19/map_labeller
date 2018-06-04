var config = {
                port:8808
             };
var express = require('express');
var app = express();
var ip = require('ip');
var userDao = require('./dao/dbdao');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


console.log(ip.address());

app.use('/',express.static('../public'));

app.post('/query', function (req, res, next){
    console.log('in app.get// ' + req.body.sql);
    userDao.query(req.body.sql, res, next);
    console.log('received command for querying!')
});

app.post('/insert', function (req, res, next){
    console.log('received command for inserting!');
    userDao.insert(req.body.sql, res, next);
});

app.post('/delete', function (req, res, next){
    userDao.deleteR(req.body.sql, res, next);
});

app.post('/update', function (req, res, next){
    userDao.update(req.body.sql, res, next);
});

var server = app.listen(config.port,function(){
    console.log("start on http://%s:%s",ip.address(),config.port);
}) 



