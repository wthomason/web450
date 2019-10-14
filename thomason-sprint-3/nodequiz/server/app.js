/*
=====================================
  ; Title: app.js
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: app.js for api
======================================
*/

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./db-models/employee');
const Quiz = require('./db-models/quiz');
const Result = require('./db-models/results');
const Summary = require('./db-models/summary');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/nodequiz')));
app.use('/', express.static(path.join(__dirname, '../dist/nodequiz')));

// Global variables
const serverPort = 3000;

/************************* Mongoose connection strings go below this line  ***************/

const connString = 'mongodb+srv://web450:admin@cluster0-aqjgi.mongodb.net/web450?retryWrites=true&w=majority';

mongoose.connect(connString, {promiseLibrary:require('bluebird'), useNewUrlParser: true})
        .then(() => console.debug('Connection to the MongoDB instance was successful!'))
        .catch((err) => console.debug('MongoDB Error: ' + err.message));


/************************* API routes go below this line ********************/


/********************** Employee API Routes ********************************/
app.post('/api/employees', function(req, res, next) {
  const employee = {
    employeeId: req.body.employeeId,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  Employee.create(employee, function(err, employees) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employees);
      res.json(employees);
    }
  });
});

app.get('/api/employees/:id', function(req, res, next) {
  Employee.findOne({'employeeId': req.params.id}, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(employee);
      res.json(employee);
    }
  })
});

/********************** Quiz API Routes ********************************/

//Create Quiz
app.post('/api/quizzes', function(req, res, next) {
  const quiz = {
    quizId: req.body.employeeId,
    quizName: req.body.quizName,
    quizDescription: req.body.quizDescription,
    cumulativeScore: req.body.cumulativeScore
  };

  Quiz.create(quiz, function(err, quizzes) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(quizzes);
      res.json(quizzes);
    }
  });
});

//Get all Quizzes
app.get('/api/quizzes/all', function(req, res, next) {
  Quiz.find(function(err, quizzes) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(quizzes);
      res.json(quizzes);
    }
  })
});

//Get Quiz by Id
app.get('/api/quizzes/:id', function(req, res, next) {
  Quiz.findOne({'quizId': req.params.id}, function(err, quiz) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(quiz);
      res.json(quiz);
    }
  })
});

/*************** Quiz Results API *******************************************/

//Create Quiz Result
app.post('/api/results', function(req, res, next) {
  const result = {
    employeeId: req.body.employeeId,
    quizId: req.body.quizId,
    result: req.body.result
  };

  Result.create(result, function(err, results) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});


/************************ Summary API ************************ */
//Create Summary Result
app.post('/api/summary', function(req, res, next) {
  const summary = {
    employeeId: req.body.employeeId,
    quizId: req.body.quizId,
    quizName: req.body.quizName,
    dateTaken: req.body.dateTaken,
    score: req.body.score
  };

  Summary.create(summary, function(err, summaries) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(summaries);
      res.json(summaries);
    }
  });
});


//Get all Quizzes
app.get('/api/summary/all', function(req, res, next) {
  Summary.find(function(err, summaries) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(summaries);
      res.json(summaries);
    }
  })
});

/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
