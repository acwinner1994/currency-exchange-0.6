var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var methodOverride=require("method-override");
var passport    = require("passport");
var localStrategy= require("passport-local");
var flash       = require("connect-flash");
var User        = require("./modules/user");
var Trans       = require("./modules/transRecord");
var GoingDeal   = require("./modules/ongoing_deal");
var indexRoutes=require("./routes/index");
var transRoutes=require("./routes/trans");
var userRoutes=require("./routes/user");

  mongoose.connect("mongodb+srv://admin:test123@cluster0-b4qcr.mongodb.net/Currency_exchangeDBX",{useNewUrlParser:true});

  //
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
//？2
app.use(methodOverride("_method"));//?
app.use(flash());

app.use(require("express-session")({
secret:"i will do whatever I can to fuck a beatiful white young girl",
resave:false,
saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  //res.locals is the objects to pass in, req.user return current user.
  res.locals.currentUser=req.user;
  next();
});

app.use(indexRoutes);
app.use(transRoutes);
app.use(userRoutes);

app.listen(process.env.PORT||3002, function(){
  console.log("The YelpCamp Server Has Started!");
});
