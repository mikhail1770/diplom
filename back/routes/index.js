var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'server9.hosting.reg.ru',
  user: 'u0856139_univdoc',
  password: 'UnivDoc71',
  database: 'u0856139_univdoc'
});

connection.connect();

/* GET home page. */
router.get('/students/:id', function(req, res, next){ //запрос данных студента по id
  connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/students', function(req, res, next){ //запрос данных студентов
  connection.query('SELECT * FROM students', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/univGroups/:id', function(req, res, next){ //запрос на получение списка группы по id
  connection.query('SELECT * FROM students WHERE UnivGroup = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/univGroups', function(req, res, next){ //запрос на получение списка групп
  connection.query('SELECT * FROM univgroups', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/professor', function(req, res, next){ //запрос на получение списка групп
  connection.query('SELECT * FROM professor', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})
router.get('/disciplines', function(req, res, next){ //запрос на получение списка дисциплин
  connection.query('SELECT * FROM disciplines', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})


module.exports = router;
