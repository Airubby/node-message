"use strict"

const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings");

function _connectDB(callback) {
    let dburl = settings.dburl;
    //连接数据库
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}

//插入数据
exports.insertOne = function(collectionName, json, callback) {
    _connectDB(function(err, db) {
        db.collection(collectionName).insertOne(json, function(err, result) {
            callback(err, result);
            db.close();
        });
    });
};

//查找数据
exports.find = function(collectionName, json, C, D) {
    let thisJson = json === null ? {} : json;
    if (arguments.length == 3) {
        var callback = C;
        var limitNum = 0;
        var skipNum = 0;
    } else if (arguments.length == 4) {
        var args = C;
        var callback = D;
        var limitNum = parseInt(args.pageNum);
        var skipNum = limitNum * parseInt(args.page);
        var sort = args.sort || {};
        //上面这些要用var定义用let定义不行，不知道为什么
    } else {
        throw new Error("find函数的参数个数必须是3个或者4个");
        return;
    }
    _connectDB(function(err, db) {
        let result = [];
        let thisInfo = db.collection(collectionName).find(thisJson).skip(skipNum).limit(limitNum).sort(sort);
        thisInfo.each(function(err, doc) {
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null) {
                result.push(doc); //放入结果数组
            } else {
                //遍历结束，没有更多的文档
                callback(null, result);
                db.close();
            }
        });
    });

}

//查询所有
exports.getAll = function(collectionName, callback) {
    _connectDB(function(err, db) {
        let result = db.collection(collectionName).count().then(function(count) {
            callback(count);
            db.close();
        });

    })
};