var express=require("express");
var router=express.Router();
var passport    = require("passport");
var User        = require("../modules/user");
var Trans       = require("../modules/transRecord");
var GoingDeal   = require("../modules/ongoing_deal");
var CompleteDeal= require("../modules/archive_trans");

router.get("/userprofile/:userid/:tranid",function(req,res){
  //first create a ongoing deal
  //then delete the offer
  //console.log(req.params.userid);
  //console.log(req.params.tranid);

  Trans.findById(req.params.tranid,function(err,foundTran){
    if(err){
      res.redirect("/");
    }
      User.findById(req.params.userid,function(err,foundUser){
        if(err){res.redirect("/");}
        var type=foundTran.type;
        var amount=foundTran.amount;
        var unit_price=foundTran.unit_price;
        var user_create=foundTran.user_create;
        var user_receive={id:foundUser._id,username:foundUser.username}; deal={type:type,amount:amount,unit_price:unit_price,status:0,user_create:user_create,user_receive:user_receive};

        //console.log(foundTran);

        GoingDeal.create(deal,function(err,createdeal){
          if(err){console.log(err);res.redirect("/");}
          //console.log("this is new created deal"+createdeal);
            Trans.findByIdAndRemove(req.params.tranid,function(err,trun){
              if(err){console.log(err);res.redirect("/");}
              //console.log("deleted trans_id:"+trun._id);
              //direct to its profile
              res.redirect("/userprofile/"+req.params.userid);
            });
        })

      });
  });


});

router.get("/userprofile/:userid",function(req,res){
  //all transaction related
  GoingDeal.find({"user_create.id":req.params.userid},function(err,foundcreated){
      if(err){console.log("err");}
      GoingDeal.find({"user_receive.id":req.params.userid},function(err,foundreceive){
        if(err){console.log("err");}
          //console.log("found created: "+foundcreated);
          //console.log("found received: "+foundreceive);
          res.render("userprofile",{createddeal:foundcreated,receiveddeal:foundreceive});
      });
  });

  //res.send("hahah");
});

router.get("/history/:userid",function(req,res){
  //all transaction related
  CompleteDeal.find({"user_create.id":req.params.userid},function(err,foundcreated){
      if(err){console.log("err");}
      CompleteDeal.find({"user_receive.id":req.params.userid},function(err,foundreceive){
        if(err){console.log("err");}
          //console.log("found created: "+foundcreated);
          //console.log("found received: "+foundreceive);
          res.render("userhistory",{createddeal:foundcreated,receiveddeal:foundreceive});
      });
  });

  //res.send("hahah");
});


module.exports=router;
