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
router.get('/search/disciplines/formOfStudy/:id', function(req, res, next){ //запрос на получение списка дисциплин группы по форме обучения (очка, заочка..)
  connection.query('SELECT disciplines.Name, univgroups.GroupName, formOfStudy.formOfStudy, univgroups.id, disciplines.disID FROM studyPlan JOIN univgroups ON studyPlan.GroupId=univgroups.id JOIN disciplines ON studyPlan.disciplineID=disciplines.disID JOIN formOfStudy ON univgroups.formOfStudy=formOfStudy.formOfStudyId WHERE formOfStudy.formOfStudyId=?', 
  [req.params.id],  function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/coursework/sort', function(req, res, next){ // в работе. Не использовать, иначе серверу хана
  let sql = 'SELECT * FROM Courseworks WHERE 1=1';
  let params = [];
  if(req.query.byName != null){
    sql = sql + ' AND goodname LIKE ?';
    params.push(`%${req.query.byName}%`)
  }
  if(req.query.diam != null){
    sql = sql + ' AND diam BETWEEN ? AND ?';
    params.push(parseInt(req.query.diam)-1)
    params.push(parseInt(req.query.diam)+1)
  }
  if(req.query.nardiam != null){
    sql = sql + ' AND nardiam BETWEEN ? AND ?';
    params.push(parseInt(req.query.nardiam)-1)
    params.push(parseInt(req.query.nardiam)+1)
  }
  if(req.query.width != null){
    sql = sql + ' AND width BETWEEN ? AND ?';
    params.push(parseInt(req.query.width)-1)
    params.push(parseInt(req.query.width)+1)
  }
  connection.query(sql, params ,function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
})


module.exports = router;
