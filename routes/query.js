var express = require('express');
var router = express.Router();

var userDao = require('./mysql/dao/dbdao');

var bodyParser = require('body-parser');
//app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));

/* insert record to mysql. */
router.get('/', function(req, res, next) {
   userDao.query(req.data.sql, res, next);
   //userDao.query(req, res, next);
   //userDao.query(req.body.sql, res, next);
   console.log('received command for querying!')
});

module.exports = router;

