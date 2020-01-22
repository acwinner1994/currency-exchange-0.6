var mongoose=require("mongoose");


var TransSchema =new mongoose.Schema({
  type: String,
  amount: String,
  unit_price:String,
  user_create:{
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  username:String
}
});


module.exports=mongoose.model("Trans",TransSchema);
//output a model, creating new item by adding objects
