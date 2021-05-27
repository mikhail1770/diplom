var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql2');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var pdf = require('../classes/pdf')
var moment = require('moment');
var cors = require('cors');
app.use(cors())

const connection = mysql.createConnection({
  host: 'server9.hosting.reg.ru',
  user: 'u0856139_univdoc',
  password: 'UnivDoc71',
  database: 'u0856139_univdoc'
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
    
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
               
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
console.log(req.filename)
});

app.listen(3002, function() {

    console.log('App running on port 3002');

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

router.get('/search/univGroups/formOfStudy/', function(req, res, next){ //запрос на получение списка групп 
  let sql = 'SELECT univgroups.id, univgroups.groupName AS groupName, univgroups.course FROM univgroups JOIN formOfStudy ON formOfStudy.id = univgroups.formOfStudy WHERE '
  let params = []
  if(req.query.formOfStudy != null){ //поиск по id группы
    sql = sql + ' univgroups.formOfStudy=?';
    params.push(parseInt(req.query.formOfStudy))
  }
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
})

router.get('/search/practiceReport/course/formOfStudy', function(req, res, next){ //запрос на получение списка практик
let sql = 'SELECT practice.id, univgroups.groupName, practice.regId, univgroups.course, courseworkresult.result, courseworkresult.id AS courseWorkResID, students.name, practice.basePractic, practice.incomingDate, practice.checkingDate, professor.profName FROM `practice` JOIN univgroups ON practice.univGroup = univgroups.id JOIN students ON students.id = practice.student JOIN professor ON professor.id = practice.professor JOIN courseworkresult ON courseworkresult.id = practice.practiceRes WHERE 1'
let params = []
if(req.query.byGroupID != null){ //поиск по id группы
  sql = sql + ' AND univgroups.id=?';
  params.push(parseInt(req.query.byGroupID))
}
if(req.query.byCourse != null){ //поиск по id курса
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
  results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('YYYY-MM-DD')} ) //делаем нормальную дату
  results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('YYYY-MM-DD')} )
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

router.get('/search/disciplines/formOfStudy/:id', function(req, res, next){ //запрос на получение списка дисциплин группы по id формы обучения
  connection.query('SELECT disciplines.id, disciplines.name FROM disciplines JOIN studyPlan ON studyPlan.disciplineID = disciplines.id WHERE studyPlan.formOfStudy = ?', 
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

router.get('/search/studnets/disciplines/formOfStudy/:id', function(req, res, next){ //запрос на получение списка студентов группы
  connection.query('SELECT DISTINCT students.name, students.id FROM students JOIN univgroups ON students.univGroup = univgroups.id JOIN studyPlan ON studyPlan.groupId = univgroups.id JOIN disciplines ON disciplines.id = studyPlan.disciplineID WHERE studyPlan.formOfStudy = ?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    console.log(req.params)
    res.json(results);
  });  
})

router.get('/search/courseworks/disciplines/univGroup/', function(req, res, next){ //запрос на получение списка курсовых
  let sql = 'SELECT disciplines.name, courseworks.id, courseworks.regId, univgroups.groupName, univgroups.id as gid, courseworks.checkingDate, courseworks.incomingDate, univgroups.course, courseworkresult.result,courseworkresult.id AS courseWorkResID, students.Name, students.id as sid, professor.profName, professor.id as pid FROM courseworks JOIN univgroups ON courseworks.univGroups=univgroups.id JOIN students ON courseworks.student=students.id JOIN disciplines ON courseworks.disciplines=disciplines.id JOIN professor ON courseworks.professor=professor.id JOIN courseworkresult ON courseworks.courseworkresult=courseworkresult.id WHERE univgroups.formOfStudy=1'
  let params = []
  if(req.query.byGroupID != null){ //поиск по id группы
    sql = sql + ' AND univgroups.id=?';
    params.push(parseInt(req.query.byGroupID))
  }
  if(req.query.byDiscipline != null){ //поиск по id дисциплины
    sql = sql + ' AND disciplines.id=?';
    params.push(parseInt(req.query.byDiscipline))
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
    results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('YYYY-MM-DD')} ) //делаем нормальную дату
    results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('YYYY-MM-DD')} )
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
      let echoresult = [];
      results.map(i => {
        let ritem = {
          name: i.name,
          id: i.id,
          regId: i.regId,
          group: {
            name: i.groupName,
            id: i.gid
          },
          checkingDate: i.checkingDate,
          incomingDate: i.incomingDate,
          course: i.course,
          result: i.result,
          courseWorkResID: i.courseWorkResID,
          student: {
            name: i.Name,
            id: i.sid
          },
          professor: {
            id: i.pid,
            name: i.profName
          }
        }
        echoresult.push(ritem);
      })
      res.json(echoresult);
    }
    if (error) throw error;
  });  
})

router.get('/search/courseworkszaoch/disciplines/univGroup/', function(req, res, next){ //запрос на получение списка курсовых заочников
   let sql = 'SELECT disciplines.name, courseworkszaoch.id,courseworkszaoch.regId, univgroups.groupName, courseworkszaoch.checkingDate, courseworkszaoch.incomingDate, univgroups.course, courseworkresult.result,courseworkresult.id AS courseWorkResID, students.Name,students.id AS sid FROM courseworkszaoch JOIN univgroups ON courseworkszaoch.univGroups = univgroups.id JOIN students ON courseworkszaoch.student = students.id JOIN disciplines ON courseworkszaoch.disciplines = disciplines.id JOIN courseworkresult ON courseworkszaoch.courseworkresult = courseworkresult.id WHERE univgroups.formOfStudy = 2'
  let params = [];
  if(req.query.byGroupID != null){ //поиск по id группы
    sql = sql + ' AND univgroups.id=?';
    params.push(parseInt(req.query.byGroupID))
  }
  if(req.query.byDiscipline != null){ //поиск по id дисциплины
    sql = sql + ' AND disciplines.id=?';
    params.push(parseInt(req.query.byDiscipline))
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
    results.map((i, index) => {results[index].incomingDate = moment(i.incomingDate).format('YYYY-MM-DD')} ) //делаем нормальную дату
    results.map((i, index) => {results[index].checkingDate = moment(i.checkingDate).format('YYYY-MM-DD')} )
    if(req.query.print == 1){ //запуск печати, если req.query.print=1
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
        discipline = results[0].name;
        let params = "courseworkszaochlist";
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

router.get('/searchg/disciplines/formOfStudy/:id', function(req, res, next){ //бесполезное говно, которое и делать то и не надо было запрос на получение списка дисциплин группы по форме обучения (очка, заочка..)
  connection.query('SELECT disciplines.Name, univgroups.GroupName, formOfStudy.formOfStudy, univgroups.id , disciplines.disID FROM studyPlan JOIN univgroups ON studyPlan.GroupId=univgroups.id JOIN disciplines ON studyPlan.disciplineID=disciplines.disID JOIN formOfStudy ON univgroups.formOfStudy=formOfStudy.formOfStudyId WHERE formOfStudy.formOfStudyId=?', 
  [req.params.id],  function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/coursework/filename/:id', function(req, res, next){ //запрос на получение списка дисциплин
  connection.query('SELECT filelink FROM courseworks WHERE courseworks.id = ?',[req.params.id], function (error, results, fields) {
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
  router.put('/edit/courseworkszaoch/:id', (req,res,next) => { //запрос на обновление данных в таблице с курсовыми заочников по id курсовой
    connection.query('UPDATE courseworkszaoch SET ? WHERE id = ?', [req.body, req.params.id], 
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  })

  router.put('/edit/practiceReport/:id', (req,res,next) => { //запрос на обновление данных в таблице с курсовыми заочников по id курсовой
    connection.query('UPDATE practice SET ? WHERE id = ?', [req.body, req.params.id], 
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

  
}

{/* DELETE запросы */

}

{/* POST запросы */
  router.post('/courseworks/add', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO courseworks (disciplines, regId, univGroups, cours, student, incomingDate, checkingDate, professor, courseworkresult, fileLink) VALUES(?,?,?,?,?,?,?,?,?,?);',
    [req.body.disciplines,req.body.regId, req.body.univGroups, req.body.cours, req.body.student, req.body.incomingDate, req.body.checkingDate, req.body.professor, req.body.courseworkresult, req.body.fileLink],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });


}
module.exports = router;
