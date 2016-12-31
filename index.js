"use strict"

const express = require('express');
const formidable = require('formidable');
const db = require('./model/db');

const app = express();

//设置模板引擎
app.set("view engine", "ejs");


//静态
app.use(express.static("./public"));

app.get("/", function(req, res) {
    db.getAll("liuyanben", function(count) {
        res.render("index", {
            "pageAll": Math.ceil(count / 5)
        });
    });
});

app.post("/tijiao", function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {

        db.insertOne("liuyanben", {
            "xingming": fields.xingming,
            "liuyan": fields.liuyan,
            "shijian": new Date()
        }, function(err, result) {

            if (err) {
                res.json({ "resultInfo": "-1" });
                return;
            }
            res.json({ "resultInfo": "1" });

        });

    });
});

//这个页面是给ajax的
app.get("/info", function(req, res) {
    let page = parseInt(req.query.page);
    if (page === NaN) {
        page = 0;
    }
    //shijian：1表示时间向后，-1表示时间向前  排序
    db.find("liuyanben", null, { "sort": { "shijian": -1 }, "pageNum": 5, "page": page }, function(err, result) {
        res.json({ "resultInfo": result });
    });
});


app.listen(3000, "127.0.0.1", function() {
    console.log("listening 3000");
});