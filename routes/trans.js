var express=require("express");
var router=express.Router();
var User        = require("../modules/user");
var Trans       = require("../modules/transRecord");
var GoingDeal   = require("../modules/ongoing_deal");
var CompleteDeal= require("../modules/archive_trans");

router.get("/newTrans",function(req,res){
  res.render("newTrans");
});

router.post("/newTrans",isLoggin,function(req,res){

  var type = req.body.trans_type;
  var amount = req.body.amount;
  var unit_price = req.body.unit_price;
  var id=req.user._id;
  var username=req.user.username;

  var newTrans = {type: type, amount: amount, unit_price: unit_price,user_create:{
  id:id,username:username}};

  // Create a new campground and save to DB
  Trans.create(newTrans, function(err, newCreated){
    if(err){
        console.log(err);
    } else {
        //redirect back to campgrounds page
        //console.log(newCreated);
        res.redirect("/");
    }
  });
});

router.get("/:id/addone",isLoggin,function(req,res){
  GoingDeal.find({_id:req.params.id},function(err,founddeal){
    if(err){console.log(err);}
    console.log("here is what founded");
    var n=parseInt(founddeal[0].status)+1;
    //var m=n.toString(n);
    //console.log(founddeal);
    GoingDeal.updateOne({_id:req.params.id},{$set:{status:n}},function(err,updateone){
      if(err){console.log(err);}
      //console.log(updateone);
      res.redirect("/userprofile/"+req.user._id);
    });
  });
});

router.get("/:id/archive",isLoggin,function(req,res){
  GoingDeal.findByIdAndRemove(req.params.id,function(err,object){
    // console.log(req.params.id);
    // console.log(object);
    var type=object.type;
    var amount=object.amount;
    var unit_price=object.unit_price;
    var user_create=object.user_create;
    var user_receive=object.user_receive;
    var enddeal={type:type,amount:amount,unit_price:unit_price,complete_date:Date(),user_create:user_create,user_receive:user_receive};
    CompleteDeal.create(enddeal,function(err,createdobject){
      if(err){console.log(err);}
      console.log(createdobject);
      res.redirect("/userprofile/"+req.user._id);
    });
  });
});

function isLoggin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;
