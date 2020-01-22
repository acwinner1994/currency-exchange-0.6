var mongoose=require("mongoose");


var completeDealSchema =new mongoose.Schema({
  type: String,
  amount: String,
  unit_price:String,
  complete_date:String,
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


module.exports=mongoose.model("completeDeal",completeDealSchema);
