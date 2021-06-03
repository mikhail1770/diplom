var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var mysql = require('mysql2');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
  
}
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var upload = multer({ storage: storage }).single('file');

var app = express();






const connection = mysql.createConnection({
  host: 'server9.hosting.reg.ru',
  user: 'u0856139_univdoc',
  password: 'UnivDoc71',
  database: 'u0856139_univdoc'
});
connection.connect();






// view engine setup
const cors = require('cors');

app.use(cors());

app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
            
        } else if (err) {
            return res.status(500).json(err)
        }
    return res.status(200).send(req.file)
  })
console.log("req.filename")
});



// Тут идет проверка токена на каждый запрос
app.use('*', (req,res, next) => {
  if(req.baseUrl != '/account/token'){
    console.log('Тут проверяем токен');
    let token = req.headers.authorization.slice(7)
    console.log(token)
    connection.query('SELECT * FROM tokens WHERE token = ?', [token], (err, token) => {
      if(err) throw err;
      if(token.length > 0){next()}else{
        res.status(401);
        res.json({error: true, detail: 'Решил подменять токен в LocalStorage ??'})
      }
    })
    //next();
  }else{
    next();
  }
  
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
