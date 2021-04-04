var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'univdoc'
});

connection.connect();

/* GET home page. */
router.get('/students/:id', function(req, res, next){
  connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });  
})

module.exports = router;
