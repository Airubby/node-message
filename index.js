"use strict"

const express = require('express');
const formidable = require('formidable');
const db = require('./model/db');

const app = express();

//设置模板引擎
app.set("view engine", "ejs");