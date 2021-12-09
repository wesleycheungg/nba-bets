const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys_development')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('../../config/validation/register')
const validateLoginInput = require('../../config/validation/login')
const mongoose = require('mongoose')

router.post('/add', (req, res) => {
  User.findById(req.body.userId, (err, user) => {
    if (user === null){
      return res.status(404).json({"msg": "user not found"})
    }
    console.log(user)
    user.currency += parseInt(req.body.amount)
    user.save()
    return res.json(user)
  })
})


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }
  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        // Otherwise create a new user
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password,
          currency: 1000
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }
  
  User.findOne({email: req.body.email}).then(
    user => {
      if(!user){
        return res.status(404).json({email: "This user does not exist"})
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!!isMatch){
          const payload = {
            //is this mongo's object id?
            id: user.id,
            handle: user.handle,
            email: user.email
          }

          jwt.sign(
            payload,
            keys.secretOrKey,
            { 
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                sucess: true, 
                token: "Bearer" + token 
              })
            }
          )
        } else {
          return res.status(400).json({password: "incorrect password"})
        }
      })
    }
  )
})

module.exports = router; 