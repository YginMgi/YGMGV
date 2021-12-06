var express = require('express');
var router = express.Router();
var models = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("time", {
    isLogin: req.session.isLogin,
    name: req.session.name,
  });
});

router.post("/",async(req,res,next)=> {
  console.log(req.body);
    const movie =  await models.Movie.create({
      movieId: req.body.movieId,
      time: req.body.time,
      theater: req.body.theater,
    });

    req.session.movieId = movie.movieId;
    req.session.time = movie.time;
    req.session.theater = movie.theater;
    res.redirect("/reservation");
  
});

module.exports = router;