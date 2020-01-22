var mongoose=require("mongoose");


var goingDealSchema =new mongoose.Schema({
  type: String,
  amount: String,
  unit_price:String,
  status:String,
  user_create:{
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  username:String
},
  user_receive:{
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  username:String
  }
});


module.exports=mongoose.model("goingDeal",goingDealSchema);
