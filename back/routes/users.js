var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});







router.get('/auth', function(req, res, next){
  let login=req.query.login;
  let password=req.query.password;
  password = md5(login+password);
  user.getUserByLogin(login, user =>{ 
    if(user.length>0){
      basePassword = user[0].password;
      let tokendate = new Date();
      if(password === basePassword){
        let jwtParams = {
          id:user[0].id,
          login: user[0].login,
          name:user[0].name,
          date: tokendate,
          ban:user[0].ban,
          type:user[0].type,
          groupId:user[0].groupId
        }
        Token.createToken(jwtParams,token=>{
          res.json(token)
        })
      }else{
        res.status(401).send('неправильный пароль') 
      }
    }else{
      res.status(401).send('user not found')
    } 
  });
})

module.exports = router;
