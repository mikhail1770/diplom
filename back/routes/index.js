var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var pdf = require('../classes/pdf')
var moment = require('moment');

const connection = mysql.createConnection({
  host: 'server9.hosting.reg.ru',
  user: 'u0856139_univdoc',
  password: 'UnivDoc71',
  database: 'u0856139_univdoc'
});

connection.connect();

{/* GET запросы */
router.get('/students/:id', function(req, res, next){ //запрос данных студента по id 
  connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/documents/:type/generate', (req,res, next) => {
  connection.query()
  
  generator.generate({});
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
    console.log();
  });  
})

router.get('/search/univGroups/formOfStudy/:id', function(req, res, next){ //запрос на получение списка групп
  connection.query('SELECT univgroups.id, univgroups.groupName AS groupName FROM univgroups JOIN formOfStudy ON formOfStudy.id=univgroups.formOfStudy WHERE univgroups.formOfStudy=?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/search/disciplines/univGroup/:id', function(req, res, next){ //запрос на получение списка дисциплин группы
  connection.query('SELECT disciplines.name AS disName, disciplines.id FROM disciplines JOIN studyPlan ON studyPlan.disciplineID=disciplines.id JOIN univgroups ON studyPlan.groupId=univgroups.id WHERE univgroups.id=?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    console.log(req.params)
    res.json(results);
  });  
})

router.get('/search/studnets/univGroup/:id', function(req, res, next){ //запрос на получение списка студентов группы
  connection.query('SELECT students.name, students.id FROM students JOIN univgroups ON students.univGroup=univgroups.id WHERE univgroups.id=?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    console.log(req.params)
    res.json(results);
  });  
})

router.get('/search/courseworks/disciplines/univGroup/', function(req, res, next){ //запрос на получение списка курсовых
  let sql = 'SELECT disciplines.name, courseworks.id, univgroups.groupName, courseworks.checkingDate, courseworks.incomingDate, univgroups.course, courseworkresult.result, students.Name, professor.profName FROM courseworks JOIN univgroups ON courseworks.univGroups=univgroups.id JOIN students ON courseworks.student=students.id JOIN disciplines ON courseworks.disciplines=disciplines.id JOIN professor ON courseworks.professor=professor.id JOIN courseworkresult ON courseworks.courseworkresult=courseworkresult.id WHERE 1=1'
  let params = [];
  console.log(params);
  if(req.query.byGroupID != null){ //поиск по id группы
    sql = sql + ' AND univgroups.id=?';
    params.push(parseInt(req.query.byGroupID))
  }
  if(req.query.byDescipline != null){ //поиск по id дисциплины
    sql = sql + ' AND disciplines.id=?';
    params.push(parseInt(req.query.byDescipline))
  }
  if(req.query.datePeriod != null){ //поиск по диапозону дат
    sql = sql + ' AND courseworks.incomingDate BETWEEN ? AND ?'
    params.push(req.query.datePeriod)
    params.push(req.query.datePeriod2)
  }
  if(req.query.byStudent != null){ //поиск по id студента
    sql = sql + ' AND students.id=?';
    params.push(parseInt(req.query.byStudent))
  }
  if(req.query.sortIncomingDate == 'ASC'){ //сортировка по возрастанию, если в query придет ASC
    sql = sql + ' ORDER BY UNIX_TIMESTAMP(STR_TO_DATE(incomingDate, "%Y-%m-%d")) ASC';
  }
  else if(req.query.sortIncomingDate == 'DESC') { // сортировка по убыванию, если в query придет DESC
  sql = sql + ' ORDER BY UNIX_TIMESTAMP(STR_TO_DATE(incomingDate, "%Y-%m-%d")) DESC';
  }
  /*if(req.query.print != null){ //печать
    params.push(parseInt(req.query.print))
  }*/
  connection.query(sql, params, function (error, results, fields) {
    let discipline
    results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} )
    results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
    if(req.query.print == 1){
      if(results.length != 0){
        discipline = results[0].name;
        let params = "courseworksochlist";
        let alldata = results.map((i) => i)
        let generator = new pdf(params,alldata,discipline)
        generator.generate({});
      }
    }
    if (error) throw error;
    console.log(req.query.print)
    res.json(results);
  });  
})

router.get('/univGroups', function(req, res, next){ //запрос на получение списка групп
  connection.query('SELECT * FROM univgroups', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/professor', function(req, res, next){ //запрос на получение списка преподавателей
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

router.get('/search/disciplines/formOfStudy/:id', function(req, res, next){ //бесполезное говно, которое и делать то и не надо было запрос на получение списка дисциплин группы по форме обучения (очка, заочка..)
  connection.query('SELECT disciplines.Name, univgroups.GroupName, formOfStudy.formOfStudy, univgroups.id , disciplines.disID FROM studyPlan JOIN univgroups ON studyPlan.GroupId=univgroups.id JOIN disciplines ON studyPlan.disciplineID=disciplines.disID JOIN formOfStudy ON univgroups.formOfStudy=formOfStudy.formOfStudyId WHERE formOfStudy.formOfStudyId=?', 
  [req.params.id],  function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})
}

{/* UPDATE запросы */
  router.put('/edit/courseworks/:id', (req,res,next) => { //запрос на обновление данных в таблице с курсовыми по id курсовой
    connection.query('UPDATE courseworks SET ? WHERE id = ?', [req.body, req.params.id], 
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })

  router.put('/edit/professor/:id', (req,res,next) => { //запрос на обновление данных в таблице преподавателей по id препода
    connection.query('UPDATE professor SET ? WHERE id = ?', [req.body, req.params.id], 
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })
  
}

{/* DELETE запросы */

}

{/* POST запросы */
  router.post('/courseworks/add', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO courseworks (disciplines, univGroups, cours, student, incomingDate, checkingDate, professor, courseworkresult, fileLink) VALUES(?,?,?,?,?,?,?,?,?);',
    [req.body.disciplines, req.body.univGroups, req.body.cours, req.body.student, req.body.incomingDate, req.body.checkingDate, req.body.professor, req.body.courseworkresult, req.body.fileLink],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });


}
module.exports = router;
