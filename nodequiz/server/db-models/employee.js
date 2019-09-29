/*
=====================================
  ; Title: employee.js
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: employee.js schema file
======================================
*/

const mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('Employee', employeeSchema);
