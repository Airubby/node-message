"use strict"

const express = require('express');
const formidable = require('formidable');

const db = require('./model/db');

const app = express();

//设置模板引擎
app.set("view engine", "ejs");


//静态
app.use(express.static("./public"));

app.get("/", function(req, res, next) {
    res.render("index");
});

app.post("/tijiao", function(req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {

        db.insertOne("liuyanben", {
            "xingming": fields.xingming,
            "liuyan": fields.liuyan
        }, function(err, result) {

            if (err) {
                res.json({ "resultInfo": "-1" });
                return;
            }
            res.json({ "resultInfo": "1" });

        });

    });
});


app.get("/info", function(req, res, next) {
    db.find("liuyanben", null, function(err, result) {
        res.json({ "resultInfo": result });
    });
});

app.listen(3000, "127.0.0.1", function() {
    console.log("listening 3000");
});