var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql2');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var pdf = require('../classes/pdf');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host: 'server9.hosting.reg.ru',
  user: 'u0856139_univdoc',
  password: 'UnivDoc71',
  database: 'u0856139_univdoc'
});


connection.connect();

{/* GET запросы */
  {/* Базовые запросы*/
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

    router.get('/typeofocupation', function(req, res, next){ //запрос на получение списка
      connection.query('SELECT * FROM typeofocupation', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });  
    })

    router.get('/disciplines/courseworks', function(req, res, next){ //запрос на получение списка дисциплин
      connection.query('SELECT * FROM disciplines WHERE disciplines.iscoursework = 1', function (error, results, fields) {
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

    router.get('/courseworkzaoch/filename/:id', function(req, res, next){ //запрос на получение списка дисциплин
      connection.query('SELECT filelink FROM courseworkszaoch WHERE courseworkszaoch.id = ?',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });  
    })
  } 


router.get('/search/univGroups/formOfStudy', function(req, res, next){ //запрос на получение списка групп 
  let sql = 'SELECT univgroups.id, univgroups.groupName AS groupName, univgroups.course FROM univgroups JOIN formOfStudy ON formOfStudy.id = univgroups.formOfStudy WHERE 1'
  let params = []
  if(req.query.formOfStudy != null){ //поиск по id группы
    sql = sql + ' AND univgroups.formOfStudy=?';
    params.push(parseInt(req.query.formOfStudy))
  }
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
})

router.get('/search/practiceReport/course/formOfStudy', function(req, res, next){ //запрос на получение списка практик
let sql = 'SELECT practice.id, univgroups.groupName,practice.filelink, practice.regId, univgroups.id as gid, professor.id as pid, students.id as sid, univgroups.course, courseworkresult.result, courseworkresult.id AS courseWorkResID, students.name, practice.basePractic, practice.incomingDate, practice.checkingDate, professor.profName FROM `practice` JOIN univgroups ON practice.univGroup = univgroups.id JOIN students ON students.id = practice.student JOIN professor ON professor.id = practice.professor JOIN courseworkresult ON courseworkresult.id = practice.practiceRes WHERE 1'
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
    if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу конец
      results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
      results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
      let params = "practicereport";
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
        id: i.id,
        regId: i.regId,
        group: {
          name: i.groupName,
          id: i.gid
        },
        basePractic: i.basePractic,
        checkingDate: i.checkingDate,
        incomingDate: i.incomingDate,
        course: i.course,
        result: i.result,
        courseWorkResID: i.courseWorkResID,
        filelink: i.filelink,
        student: {
          name: i.name,
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

router.get('/search/disciplines/univGroup/:id', function(req, res, next){ //запрос на получение списка дисциплин группы
  connection.query('SELECT disciplines.name AS disName, disciplines.id FROM disciplines JOIN studyPlan ON studyPlan.disciplineID=disciplines.id JOIN univgroups ON studyPlan.groupId=univgroups.id WHERE univgroups.id=? AND disciplines.iscoursework = 1', 
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

router.get('/search/studnets/univGroup/:id', function(req, res, next){ //
  connection.query('SELECT students.name, students.id FROM students JOIN univgroups ON students.univGroup=univgroups.id WHERE univgroups.id=?', 
  [req.params.id], function (error, results, fields) {
    if (error) throw error;
    console.log(req.params)
    res.json(results);
  });  
})

router.get('/search/studnets/disciplines/formOfStudy/', function(req, res, next){ //запрос на получение списка студентов группы
  let sql='SELECT DISTINCT students.name, students.id, univgroups.id AS gid, univgroups.groupName FROM students JOIN univgroups ON students.univGroup = univgroups.id JOIN studyPlan ON studyPlan.groupId = univgroups.id JOIN disciplines ON disciplines.id = studyPlan.disciplineID WHERE 1'
  let params = []
  if(req.query.byDiscipline != null){ //поиск по id группы
    sql = sql + ' AND disciplines.id = ?';
    params.push(parseInt(req.query.byDiscipline))
  }
  if(req.query.formOfStudy != null){ //поиск по id группы
    sql = sql + ' AND studyPlan.formOfStudy = ?';
    params.push(parseInt(req.query.formOfStudy))
  }
  connection.query(sql,params, function (error, results, fields) {
    if (error) throw error;
    console.log(params)
    res.json(results);
  });  
})

router.get('/search/courseworks/disciplines/univGroup/', function(req, res, next){ //запрос на получение списка курсовых
  let sql = 'SELECT disciplines.name, courseworks.id, courseworks.regId, univgroups.groupName, courseworks.filelink, univgroups.id as gid, courseworks.checkingDate, courseworks.incomingDate, univgroups.course, courseworkresult.result,courseworkresult.id AS courseWorkResID, students.Name, students.id as sid, professor.profName, professor.id as pid FROM courseworks JOIN univgroups ON courseworks.univGroups=univgroups.id JOIN students ON courseworks.student=students.id JOIN disciplines ON courseworks.disciplines=disciplines.id JOIN professor ON courseworks.professor=professor.id JOIN courseworkresult ON courseworks.courseworkresult=courseworkresult.id WHERE univgroups.formOfStudy=1 AND disciplines.iscoursework = 1'
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
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу конец
        results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
        results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
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
          filelink: i.filelink,
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
   let sql = 'SELECT disciplines.name, courseworkszaoch.id,courseworkszaoch.regId,courseworkszaoch.filelink, univgroups.groupName, courseworkszaoch.checkingDate, courseworkszaoch.incomingDate, univgroups.course, courseworkresult.result,courseworkresult.id AS courseWorkResID, students.Name,students.id AS sid FROM courseworkszaoch JOIN univgroups ON courseworkszaoch.univGroups = univgroups.id JOIN students ON courseworkszaoch.student = students.id JOIN disciplines ON courseworkszaoch.disciplines = disciplines.id JOIN courseworkresult ON courseworkszaoch.courseworkresult = courseworkresult.id WHERE univgroups.formOfStudy = 2'
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
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу конец
        results.map((i, index) => { results[index].incomingDate = moment(i.incomingDate).format('DD-MM-YYYY')} ) //делаем нормальную дату
        results.map((i, index) => { results[index].checkingDate = moment(i.checkingDate).format('DD-MM-YYYY')} )
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
          filelink: i.filelink,
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

router.get('/searchg/disciplines/formOfStudy/:id', function(req, res, next){ 
  connection.query('SELECT disciplines.Name, univgroups.GroupName, formOfStudy.formOfStudy, univgroups.id , disciplines.disID FROM studyPlan JOIN univgroups ON studyPlan.GroupId=univgroups.id JOIN disciplines ON studyPlan.disciplineID=disciplines.disID JOIN formOfStudy ON univgroups.formOfStudy=formOfStudy.formOfStudyId WHERE formOfStudy.formOfStudyId=?', 
  [req.params.id],  function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

router.get('/search/profInEvent/profName/', function(req, res, next){ //запрос на получение списка...
  let sql = 'SELECT profInEvent.id, profInEvent.profId, profInEvent.eventName, profInEvent.eventDate, professor.id AS pid, professor.profName FROM profInEvent JOIN professor ON professor.id = profInEvent.profId WHERE 1'
  let params = []
  if(req.query.profId != null){ //поиск по id преподавателя
    sql = sql + ' AND profInEvent.profId = ?';
    params.push(parseInt(req.query.profId))
  }
  connection.query(sql, params, function (error, results, fields) {
    results.map((i, index) => { results[index].eventDate = moment(i.eventDate).format('YYYY-MM-DD')} ) //делаем нормальную дату
    if(req.query.print == 1){ //запуск печати, если req.query.print=1
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
        discipline = results[0].name;
        let params = "profEvent";
        let alldata = results.map((i) => i)
        let orientation = "Landscape";
        console.log(alldata)
        let generator = new pdf(params,alldata,discipline,orientation)
        generator.generate({}, (url) => {          
          res.json({filename: url})
          
        });
      }
    }else{   let echoresult = [];
      results.map(i => {
        let ritem = {
          id: i.id,
          eventDate: i.eventDate,
          eventName: i.eventName,
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

router.get('/search/event/profName/', function(req, res, next){ //запрос на получение списка...
  let sql = 'SELECT event.id, event.eventDate, event.theme, event.rank, event.review, professor.id AS pid, event.profId2, pr1_duble.profName AS pname2, professor.profName, rank.Rank, typeofoccupation.id AS tid, typeofoccupation.typename FROM event JOIN professor ON professor.id = event.profId LEFT JOIN professor AS pr1_duble ON event.profId2 = pr1_duble.id JOIN rank ON event.rank = rank.id JOIN typeofoccupation ON typeofoccupation.id = event.typeofoccupation WHERE 1'
  let params = []
  if(req.query.profId != null){ //поиск по id преподавателя
    sql = sql + ' AND event.profId = ?';
    params.push(parseInt(req.query.profId))
  }
  connection.query(sql, params, function (error, results, fields) {
    results.map((i, index) => { results[index].eventDate = moment(i.eventDate).format('YYYY-MM-DD')} ) //делаем нормальную дату
    if(req.query.print == 1){ //запуск печати, если req.query.print=1
      if(results.length != 0){ //проверка на то чтобы массив не был пустым, иначе серверу кабзда
        discipline = results[0].name;
        let params = "event";
        let alldata = results.map((i) => i)
        let orientation = "Landscape";
        console.log(alldata)
        let generator = new pdf(params,alldata,discipline,orientation)
        generator.generate({}, (url) => {          
          res.json({filename: url}) 
        });
      }
    }else{   let echoresult = [];
      results.map(i => {
        let ritem = {
          id: i.id,
          eventDate: i.eventDate,
          eventTheme: i.theme,
          typename: i.typename,
          typeofocupation: i.tid,
          review: i.review,
          professor: {
            prof2: i.profId2,
            pname: i.pname2,
            profRank: i.Rank,
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

  router.put('/edit/practiceReport/:id', (req,res,next) => { //запрос на обновление данных в таблице с практиками по id курсовой
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

  router.put('/edit/profInEvent/:id', (req,res,next) => { //запрос на обновление данных в таблице с учет участия профессорско-преподавательского состава в мероприятиях
    connection.query('UPDATE profInEvent SET ? WHERE id = ?', [req.body, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })

  router.put('/edit/event/:id', (req,res,next) => { //запрос на обновление данных в таблице с учет участия профессорско-преподавательского состава в мероприятиях
    connection.query('UPDATE event SET ? WHERE id = ?', [req.body, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
      console.log(req.body)
    });
  })
}

{/* DELETE запросы */
  router.delete('/delete/courseworks/:id', function(req, res, next){
    connection.query('DELETE FROM courseworks WHERE id = ?',[req.params.id], 
    function (error, results, fields){
      if (error) throw error;
      res.json(results);
    });
  })

  router.delete('/delete/courseworkszaoch/:id', function(req, res, next){
    connection.query('DELETE FROM courseworkszaoch WHERE id = ?',[req.params.id], 
    function (error, results, fields){
      if (error) throw error;
      res.json(results);
    });
  })

  router.delete('/delete/practiceReport/:id', function(req, res, next){
    connection.query('DELETE FROM practice WHERE id = ?',[req.params.id], 
    function (error, results, fields){
      if (error) throw error;
      res.json(results);
    });
  })

  router.delete('/delete/profInEvent/:id', function(req, res, next){
    connection.query('DELETE FROM profInEvent WHERE id = ?',[req.params.id], 
    function (error, results, fields){
      if (error) throw error;
      res.json(results);
    });
  })

  router.delete('/delete/event/:id', function(req, res, next){
    connection.query('DELETE FROM event WHERE id = ?',[req.params.id], 
    function (error, results, fields){
      if (error) throw error;
      res.json(results);
    });
  })
}

{/* POST запросы */
  router.post('/add/courseworks/', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO `courseworks` (`regId`, `disciplines`, `univGroups`, `cours`, `student`, `incomingDate`, `checkingDate`, `professor`, `courseworkresult`, `filelink`) VALUES (?,?,?,?,?,?,?,?,?,?);',
    [req.body.regId, req.body.disciplines, req.body.univGroups, req.body.cours, req.body.student, req.body.incomingDate, req.body.checkingDate, req.body.professor, req.body.courseworkresult, req.body.filelink],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });

  router.post('/add/courseworkszaoch/', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO `courseworkszaoch` (`regId`, `disciplines`, `univGroups`, `student`, `incomingDate`, `checkingDate`, `courseworkresult`, `filelink`) VALUES (?,?,?,?,?,?,?,?);',
    [req.body.regId, req.body.disciplines, req.body.univGroups, req.body.student, req.body.incomingDate, req.body.checkingDate, req.body.courseworkresult, req.body.filelink],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });

  router.post('/add/practiceReport/', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO `practice` (`regId`, `univGroup`, `course`, `student`, `basePractic`, `incomingDate`, `professor`, `checkingDate`, `practiceRes`) VALUES (?,?,?,?,?,?,?,?,?);',
    [req.body.regId, req.body.univGroups, req.body.course, req.body.student, req.body.basePractic, req.body.incomingDate, req.body.professor, req.body.checkingDate, req.body.practiceRes],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });

  router.post('/add/profInEvent/', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO `profInEvent` (profId, eventName, eventDate) VALUES (?,?,?);',
    [req.body.profId, req.body.eventName, req.body.eventDate],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });

  router.post('/add/event/', function(req, res, next){
    console.log(req.body)
    connection.query('INSERT INTO event (profId, theme, typeofoccupation, rank, review, eventDate) VALUES (?,?,?,?,?,?);',
    [req.body.profId, req.body.theme, req.body.typeofoccupation, req.body.rank, req.body.review, req.body.eventDate],
     function (err, results, fields){
       if(err) throw err;    
       res.json(results);
    });
  });

  {/*авторизация и регистрация*/
    router.post('/account/token', (req,res) => {
      if(req.body.login.length == 0 || req.body.password.length == 0){
        res.status('401');
        res.json({error: true, detail: 'Ошибока произошла некоторая, почему не указали логин или пароль? Ай-яй-яй, они не могут быть пустыми'})
      }else{
        connection.query('SELECT * FROM users WHERE login = ? AND password = ?', [req.body.login, req.body.password], (err, result) => {
          if(err) throw err;
          if(result.length == 0){
            res.status('401');
            res.json({error: true, detail: 'Неверный логин или пароль'})
          }else{
            let token = jwt.sign({ id: result[0].id, fio: result[0].fio }, 'sekretkey');
            res.json({error : false, detail: token});
            connection.query('INSERT INTO tokens (token, userid,tokenTime) VALUES(?,?,NOW()~)', [token, result[0].id], (err, token) => {if(err) throw err})
          }
        })
      }
    });
    
    router.post('/registration/newUser/', function(req, res, next){
      console.log(req.body.user)
      if(req.body.length != 0){
          var pattern = /^[a-z0-9]+$/i;
          if (pattern.test(req.body.login) & pattern.test(req.body.password)) {
            connection.query('INSERT INTO users(users.login, users.password, users.fio) VALUES(?,?,?);',
            [req.body.login, req.body.password, req.body.fio],
            function (err, results, fields){
              if(err) throw err;    
              res.json('Вы успешно зарегистрированы');
            });
          } else {
            res.json('Используйте только латинские символы');
          }
        }
    });
  }
}
module.exports = router;
