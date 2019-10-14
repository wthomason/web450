/*
=====================================
  ; Title: results.js
  ; Author: William Thomason
  ; Date: October 11 2019
  ; Description: results.js schema file
======================================
*/

const mongoose = require('mongoose');

let resultSchema = mongoose.Schema({
  employeeId: String,
  quizId: String,
  result: String

});

module.exports = mongoose.model('Result', resultSchema);
