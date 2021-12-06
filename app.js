const express = require("express")
const app = express(); 
const mongoose = require("mongoose")
const db = require('./config/keys').monogURI
const users = require("./routes/api/users")
const User = require("./models/User")
const bodyParser = require("body-parser")
const passport = require("passport");



mongoose.connect(db, {  useNewUrlParser: true }).then(
  () => console.log("connected to mongoDB")
)

app.use(bodyParser.urlencoded({
  extended: false
}) )

app.use(bodyParser.json()); 



app.get("/", (req, res) => {
  const user = new User({
    handle: "owen",
    email: "owen@owen.net",
    password: "qwerty123"
  })
  user.save()
});

// app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);


const port = process.env.PORT || 5000; 

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})