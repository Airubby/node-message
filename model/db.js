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