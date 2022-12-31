
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const findOrCreate = require('mongoose-findorcreate')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());





mongoose.connect('mongodb://127.0.0.1:27017/SecretDB', {useNewUrlParser:true});



const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    googleId: String,
    secret: String
});


userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = new mongoose.model("User", userSchema)



passport.use(User.createStrategy());


passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    passReqToCallback   : true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile.id);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.get("/", function(req, res){
res.render("home")
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get("/auth/google/secrets",
    passport.authenticate('google', {failureRedirect: '/login'}), function(req,res){
        res.redirect("/secrets")
    } 
)

app.get("/", function(req, res){
    res.render("home")
    })


    app.get("/login", function(req, res){
        res.render("login")
        
        })
app.get("/submit", function(req, res){
    if(req.isAuthenticated()){
        res.render("submit")
        } else {
        res.redirect("/login")
       }
})

        app.get("/register", function(req, res){
            res.render("register")
            })
app.get("/logout", function(req, res){
    req.logout(function(err){
        console.log(err);
    });
    res.redirect("/")
})

app.get("/faliure", function(req, res){
    res.render("faliure")
})
           

app.get("/secrets", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
        if (err){
          console.log(err);
        } else {
          if (foundUsers) {
            res.render("secrets", {usersWithSecrets: foundUsers});
            
          }
        }
      });
})

app.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register")
        } else {
           passport.authenticate("local") (req, res, function(){
            res.redirect("/secrets")
           })
        }
    })
    });

   

    app.post("/submit", function(req, res){
        const submittedSecret = req.body.secret;
      
      //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
        // console.log(req.user.id);
      
        User.findById(req.user.id, function(err, foundUser){
          if (err) {
            console.log(err);
          } else {
            if (foundUser) {
              foundUser.secret = submittedSecret;
              foundUser.save(function(){
                res.redirect("/secrets");
              });
            }
          }
        });
      });
      

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local", { failureRedirect: '/faliure', failureMessage: true })(req, res, function(){
                res.redirect("/secrets")
            })
           
        }
    })
})

app.post("/faliure", function (req, res){
    res.redirect("/login")
    } )


app.listen(3000, function(){
    console.log("Server is running at port 3000")
})




//const secret = process.env.SECRET #level 2

//userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]}) //we can add more encrypted enteries by add , and the oter enteries level2

//md5 for level 3

// bencrypt for level4

// level 5 passport documentation
