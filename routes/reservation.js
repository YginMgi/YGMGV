var express = require('express');
var router = express.Router();
var models = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reservation', {
    isLogin: req.session.isLogin,
    name: req.session.name,
    val:{
      movieId: req.session.movieId,
      time: req.session.time,
      theater: req.session.theater
    }
  });
});

router.post("/",async(req,res,next)=> {
  console.log(req.body);
  const data = await models.Movie.findAll();
    const reservation =  models.Reservation.create({
      seat: req.body.seat,
      UserUserId: req.session.userId,
      MovieMovieId: data[0].movieId
    });
    console.log("좌석 선택 완료");
    req.session.reservationId = reservation.reservationId,
    req.session.seat = reservation.seat
    res.redirect("/");
  
});

module.exports = router;