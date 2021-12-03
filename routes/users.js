var express = require('express');
var router = express.Router();
var models = require("../models");
var bcrypt = require("bcrypt");

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  if (req.body.userId && req.body.password) {
    const data = models.User.findAll({
      where: {
        userId: req.body.userId,
      },
    });
    if (!data[0]) {
      res.send({ msg: "존재하지 않는 사용자 입니다." });
      return;
    }
    const comparePassword = bcrypt.compare(data.password, req.body.password, () => {});
    if (comparePassword) {
      console.log("로그인 성공");
      req.session.userId = data[0].userId;
      req.session.name = data[0].name;
      res.redirect("/");
    } else {
      res.send({ msg: "비밀번호가 잘못되었습니다." });
    }
  } else {
    res.send({ msg: "불완전한 요청" });
  }
});

router.post("/signup",async(req,res,next)=> {
  console.log(req.body);
  if(
    req.body.userId &&
    req.body.password &&
    req.body.name 
  ){
    const data = models.User.findAll({
      where: {
        userId: req.body.userId,
      },
    });
    if (data[0]) {
      console.log("해당 유저가 존재!");
      res.send({ error: "이미 존재하는 이메일" });
    } else {
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const user =  models.User.create({
        userId: req.body.userId,
        password: encryptedPassword,
        name: req.body.name,
      });
      console.log("회원가입 완료");
      //회원가입 완료후 토큰 생성
      // req.session.isLogin = true;
      // req.session.userId = user.userId;
      // req.session.name = user.name;
      res.redirect("/");
    }
  } else {
    res.send({ msg: "불완전한 데이터" });
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
