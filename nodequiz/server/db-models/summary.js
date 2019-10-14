/*
=====================================
  ; Title: summary.js
  ; Author: William Thomason
  ; Date: October 11 2019
  ; Description: summary.js schema file
======================================
*/

const mongoose = require('mongoose');

let summarySchema = mongoose.Schema({
  employeeId: String,
      quizId: String,
      quizName: String,
      dateTaken:String,
      score: String

});

module.exports = mongoose.model('Summary', summarySchema);
