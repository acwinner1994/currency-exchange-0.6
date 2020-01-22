var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var UserSchema =new mongoose.Schema({
  username: String,
  password: String,
  USDaccount:String,
  CNYaccount:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);
//output a model, creating new item by adding objects
