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
    console.log(results);
  });  
})

router.get('/search/univGroups/formOfStudy/:id', function(req, res, next){ //запрос на получение списка групп 
  connection.query('SELECT univgroups.id, univgroups.groupName AS groupName, univgroups.course FROM univgroups JOIN formOfStudy ON formOfStudy.id = univgroups.formOfStudy WHERE univgroups.formOfStudy = ?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/search/practiceReport/course/formOfStudy', function(req, res, next){ //запрос на получение списка групп через курс
let sql = 'SELECT practice.id, univgroups.groupName, univgroups.course, courseworkresult.result, students.name, practice.basePractic, practice.incomingDate, practice.checkingDate, professor.profName FROM `practice` JOIN univgroups ON practice.univGroup = univgroups.id JOIN students ON students.id = practice.student JOIN professor ON professor.id = practice.professor JOIN courseworkresult ON courseworkresult.id = practice.practiceRes WHERE 1'
let params = []
if(req.query.byGroupID != null){ //поиск по id группы
  sql = sql + ' AND univgroups.id=?';
  params.push(parseInt(req.query.byGroupID))
}
if(req.query.byDescipline != null){ //поиск по id дисциплины
  sql = sql + ' AND univgroups.course=?';
  params.push(parseInt(req.query.byCourse))
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
connection.query(sql, params, function (error, results, fields) {
  let discipline
  results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
  results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
  console.log(results)
  if(req.query.print == 1){ //запуск печати, если req.query.print=1
    if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
      let params = "practicereport";
      let alldata = results.map((i) => i)
      let orientation = "Landscape";
      let generator = new pdf(params,alldata,discipline,orientation)
      generator.generate({}, (url) => {          
        res.json({filename: url})
      });
    }
  }else{
    res.json(results);
  }
  if (error) throw error;
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
  let sql = 'SELECT disciplines.name, courseworks.id, univgroups.groupName, courseworks.checkingDate, courseworks.incomingDate, univgroups.course, courseworkresult.result, students.Name, professor.profName FROM courseworks JOIN univgroups ON courseworks.univGroups=univgroups.id JOIN students ON courseworks.student=students.id JOIN disciplines ON courseworks.disciplines=disciplines.id JOIN professor ON courseworks.professor=professor.id JOIN courseworkresult ON courseworks.courseworkresult=courseworkresult.id WHERE univgroups.formOfStudy=1'
  let params = []
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
  connection.query(sql, params, function (error, results, fields) {
    let discipline
    results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
    results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
    console.log(results)
    if(req.query.print == 1){ //запуск печати, если req.query.print=1
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
        discipline = results[0].name;
        let params = "courseworksochlist";
        let alldata = results.map((i) => i)
        let orientation = "Landscape";
        let generator = new pdf(params,alldata,discipline,orientation)
        generator.generate({}, (url) => {          
          res.json({filename: url})
        });
      }
    }else{
      res.json(results);
    }
    if (error) throw error;
  });  
})

router.get('/search/courseworkszaoch/disciplines/univGroup/', function(req, res, next){ //запрос на получение списка курсовых заочников
   let sql = 'SELECT disciplines.name, courseworkszaoch.id, univgroups.groupName, courseworkszaoch.checkingDate, courseworkszaoch.incomingDate, univgroups.course, courseworkresult.result, students.Name FROM courseworkszaoch JOIN univgroups ON courseworkszaoch.univGroups = univgroups.id JOIN students ON courseworkszaoch.student = students.id JOIN disciplines ON courseworkszaoch.disciplines = disciplines.id JOIN courseworkresult ON courseworkszaoch.courseworkresult = courseworkresult.id WHERE univgroups.formOfStudy = 2'
  let params = [];
  if(req.query.byGroupID != null){ //поиск по id группы
    sql = sql + ' AND univgroups.id=?';
    params.push(parseInt(req.query.byGroupID))
  }
  if(req.query.byDescipline != null){ //поиск по id дисциплины
    sql = sql + ' AND disciplines.id=?';
    params.push(parseInt(req.query.byDescipline))
  }
  if(req.query.datePeriod != null){ //поиск по диапозону дат
    sql = sql + ' AND courseworkszaoch.incomingDate BETWEEN ? AND ?'
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
  connection.query(sql, params, function (error, results, fields) {
    let discipline
    console.log()
    results.map((i, index) => {results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
    results.map((i, index) => {results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
    if(req.query.print == 1){ //запуск печати, если req.query.print=1
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
        discipline = results[0].name;
        let params = "courseworkszaochlist";
        let alldata = results.map((i) => i)
        let orientation = "Landscape";
        let generator = new pdf(params,alldata,discipline,orientation)
        generator.generate({}, (url) => {          
          res.json({filename: url})
          console.log(alldata)
        });
      }
    }else{
      res.json(results);
    }
    if (error) throw error;
    
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
  
  router.put('/edit/courseworkszaoch/:id', (req,res,next) => { //запрос на обновление данных в таблице с курсовыми заочников по id курсовой
    connection.query('UPDATE courseworkszoch SET ? WHERE id = ?', [req.body, req.params.id], 
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })

  /*router.put('/joke', (req,res,next) => { //анехдот
    connection.query( function (error, results, fields) {
      let jokeSelect = require('rand-token').generator({numeric});
      if(jokeSelect == 1 || jokeSelect ==2 ){
      results = 'В дверь постучали 57 раз.                "Нахера я считал" - подумал я'
      }
      else if(jokeSelect == 3 || jokeSelect == 4 ){
        results = 'В дверь постучали 0 раз                "Отец" - подумал я'
      }
      else if(jokeSelect == 5 || jokeSelect == 6 ){
        results = 'Зашел на сайт для сирот, но домашняя страничка не прогрузилась'
      }else if(jokeSelect == 7 || jokeSelect == 8 ){
        results = 'В дверь постучали 0 раз                "Отец" - подумал я'
      }
      else if(jokeSelect == 9){
        results = 'И чего ты ждал? Шуточек прибауточек? ЧМО'
      }
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })*/

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
