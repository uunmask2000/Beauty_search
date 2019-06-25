var http = require('http');
var express = require('express');
// 
var request = require('request');
var bodyParser = require('body-parser')
// 

//DB mysql 
var mysql = require('mysql');
db_confing = {
    host: '192.168.150.129',
    user: 'IMG',
    password: 'nhbTmTXi6r65Ncz5',
    database: 'IMG'
}
//建立連線
var connection = mysql.createConnection(db_confing);
//開始連接
connection.connect();
//接著就可以開始進行查詢
connection.query('SELECT 1 + 1 AS solution', function (error, rows, fields) {
    //檢查是否有錯誤
    if (error) {
        // throw error;
        console.log('connection error');
        process.exit(1);
    }
    // console.log(rows[0].solution); //2

    if (rows[0].solution != 2) {
        console.log('connection error');
        process.exit(1);
    }
});

//

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



var server = http.createServer(app);
app.get('/', function (request, response) { //我們要處理URL為 "/" 的HTTP GET請求
    response.end('你好！'); //作出回應
});


/**
 *  圖片存放
 */
app.post('/api/img_save', function (req, res) {
    var ret_json = {
        "code": 999,
        "msg": 'error',
        "data": []
    }

    /// 首先判斷 serchcode 是否存在過
    // console.log(connection) 
    connection.query('SELECT * FROM img_mian where serchcode = ? ', req.body.serchcode, function (error, rows, fields) {
        if (error) {
            console.log('查詢資料失敗！');
            throw error;
        }
        // console.log('查詢資料！');
        // console.log(rows);
        // console.log(rows.length)
        var img_id = 0
        if (rows.length == 0) {

            //插入資料
            var data = {
                serchcode: req.body.serchcode,
                description: req.body.description,
                title: req.body.title
            };

            img_id_ = connection.query('INSERT INTO `img_mian` SET ?', data, function (error, result) {
                if (error) {
                    console.log('寫入資料失敗！');
                    throw error;
                }
                console.log("Employee Id:- " + result.insertId);
                // 新增圖片
                add_SSSS(result.insertId, req)
            });

        }
        ///  查詢並寫入分類  section




    });

    ret_json['code'] = 0
    ret_json['msg'] = '成功'




    res.end(res.json(ret_json)); //作出回應
    // res.end(res.json(req.body)); //作出回應
});


/**
 * 
 */
app.post('/api/get_img', function (req, res) {

    var ret_json = {
        "code": 999,
        "msg": 'error',
        "data": []
    }

    connection.query('SELECT idimg_id , title ,description  FROM img_mian  ', function (error, rows, fields) {
        if (error) {
            console.log('查詢資料失敗！');
            throw error;
        }

        if (rows.length == 0) {
            ret_json['code'] = 1
            ret_json['msg'] = '沒有資料'
            // res.json(ret_json); //作出回應
        } else {
            ret_json['code'] = 0
            ret_json['msg'] = '成功'
            ret_json['data'] = rows
        }
        res.end(res.json(ret_json)); //作出回應
    });
});

/**
 * 
 */
app.post('/api/get_img_list_path', function (req, res) {

    var ret_json = {
        "code": 999,
        "msg": 'error',
        "data": []
    }

    connection.query('SELECT img_path_url  FROM img_path  where  img_path_fk = ? ', req.body.id, function (error, rows, fields) {
        if (error) {
            console.log('查詢資料失敗！');
            throw error;
        }

        if (rows.length == 0) {
            ret_json['code'] = 1
            ret_json['msg'] = '沒有資料'
            // res.json(ret_json); //作出回應
        } else {
            ret_json['code'] = 0
            ret_json['msg'] = '成功'
            ret_json['data'] = rows
        }

        res.end(res.json(ret_json)); //作出回應
    });


});

/**
 * 新增圖片 
 * @param {*} img_id 
 * @param {*} params 
 */
function add_SSSS(img_id, params) {
    console.log(img_id);
    // console.log(params);

    connection.query('SET SQL_SAFE_UPDATES=0; DELETE FROM img_path WHERE  img_path_fk = ? ;', img_id, function (error, result) {
        if (error) {
            console.log('刪除資料失敗！');
            // throw error;
            console.log(error)
        }
        console.log(result)
    });
    /// 圖片 寫入db img obj
    const items = [];
    ///
    params.body.img.forEach(function (element) {
        // console.log(element);
        items.push({ img_path_url: element, img_path_fk: img_id });
    });
    // console.log(items);
    connection.query(
        'INSERT INTO img_path (img_path_fk, img_path_url) VALUES ?',
        [items.map(item => [item.img_path_fk, item.img_path_url])],
        (error, results) => {
            if (error) {
                console.log('寫入資料失敗！');
                throw error;
            }
        }
    );
}


// ###########################。
server.listen(8080, '127.0.0.1', function () {
    console.log('HTTP伺服器在 http://127.0.0.1:8080/ 上運行');
});


////
