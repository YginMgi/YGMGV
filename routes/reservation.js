var express = require('express');
var router = express.Router();
var models = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  const data =  models.Movie.findAll();
  console.log(data[0]);
  res.render("reservation", {
    isLogin: req.session.isLogin,
    name: req.session.name,
    movieId: data[0].movieId,
    time: data[0].time,
    theater: data[0].theater,
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