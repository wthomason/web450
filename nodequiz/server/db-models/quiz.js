/*
=====================================
  ; Title: quiz.js
  ; Author: William Thomason
  ; Date: October 02 2019
  ; Description: quiz.js schema file
======================================
*/

const mongoose = require('mongoose');

let quizSchema = mongoose.Schema({
  quizId: Number,
  quizName: String,
  quizDescription: String,
  cumulativeScore: Number
});

module.exports = mongoose.model('Quiz', quizSchema);
