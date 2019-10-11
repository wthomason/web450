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
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  q6: String,
  q7: String,
  q8: String,
  q9: String,
  q10: String
  
});

module.exports = mongoose.model('Result', resultSchema);