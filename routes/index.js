var express=require("express");
var router=express.Router();
var passport    = require("passport");
var User        = require("../modules/user");
var Trans       = require("../modules/transRecord");
var GoingDeal   = require("../modules/ongoing_deal");

router.get("/",function(req,res){
  //get all trans proposed:
  Trans.find({}, function(err, alltrans){
     if(err){
         console.log(err);
     } else {
        res.render("home",{trans:alltrans});
     }
  });
});

//============
//user routes
//============

router.get("/login",function(req,res){
  res.render("login");
});

router.get("/register",function(req,res){
  res.render("register");
});

router.post("/register",function(req,res){
  User.register(new User({username:req.body.username,USDaccount:req.body.USDaccount,CNYaccount:req.body.CNYaccount}),
  req.body.password,function(err,user){
      if(err){
        console.log(err);
        return res.render('register');
      }
      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      });
  });
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

router.get("/admin",function(req,res){
  GoingDeal.find({status:1},function(err,finddeal){
    if(err){console.log(err);}
    res.render("admin",{finddeal:finddeal});
  });

});

module.exports=router;
