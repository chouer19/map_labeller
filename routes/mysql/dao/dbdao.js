
//use the connection pool
var pool = require('./db/pool.js');

/*
if test
function querdddy(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();
        }); 
    }); 
}
*/
///response to client with json object
var jsonWrite = function(res,ret){//1
    if(typeof ret === 'undefined'){
        res.json({
          code:'404',
          msg:'dead!'
        });
    }else{
        //console.log(ret);
        res.json(ret);
    }
};//1

module.exports = {//2
    //query data
    query:function(sql,res,next){//3
        pool.getConnection(function(err, connection){//7
            connection.query(sql, function(err, result){//8
                if(result){
                }else{
                   result = {
                      code:404
                   };
                }
                jsonWrite(res, result);
                connection.release();
            });//8
        });//7
    },//3
    //insert new record
    insert:function(sql,res,next){//4
        pool.getConnection(function(err, connection){//5
            connection.query(sql, function(err, result){//6
                console.log('come in insert function in userdao.js');
                console.log('insert sql is :',sql);
                if(result){
                    result = {
                        code: 200,
                        msg:'insert Success'
                    };
                }
                else{
                    result = {
                        code: 404,
                        msg:'insert failed'
                    };
                }
                console.log(result);
                jsonWrite(res, result);
                connection.release();
            });//6
        });//5
    },//4
    deleteR:function(sql,res,next){//9
        pool.getConnection(function(err, connection){//10
            //var sql = req.body.sql;
            connection.query(sql, function(err, result){//11
                if(result.affectedRows > 0){
                    result = {
                        code: 200,
                        msg:'delete success!'
                    };
                }
                else{
                    result = {
                        code: 404,
                        msg:'delete failed'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });//11
        });//10
    }, //9   
    update:function(sql,res,next){//16
        pool.getConnection(function(err, connection){//15
            //var sql = req.body.sql;
            connection.query(sql, function(err, result){//14
                if(result.affectedRows > 0){
                    result = {
                        code: 200,
                        msg:'update success!'
                    };
                }
                else{
                    result = {
                        code: 404,
                        msg:'update failed'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });//14
        });//13
    }//12   
}//2
