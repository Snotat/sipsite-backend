var express = require('express');
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Business = require('../models/businessSchema');
const { JWT_SECRET } = require('../utils/config');
var BusinessRouter = express.Router();

/* GET users listing. */
BusinessRouter.get('/', async function (req, res, next) {
  await Business.find().then(data => {
    console.log(data)
    return res.status(200).json(data)
  }).catch(err => {
    console.log(err)
  })
});

BusinessRouter.post('/', async function (req, res, next) {
  console.log("user router post", req.body)
  let { businessName, registrationNumber, businessType, establishmentDate, street, city, state, zip, country, phone, email, website, ownerName, ownerEmail, ownerPhone, password, confirmPassword, acceptedTerms } = req.body
  const SALTROUND = 10;


  const hashPassword = await bcrypt.hash(confirmPassword, SALTROUND)
  let newUser = {
    businessName, registrationNumber, businessType, establishmentDate, address: {
      street,
      city,
      state,
      zip,
      country
    }, phone, email, website, owner: {
      name: ownerName,
      email: ownerEmail,
      phone: ownerPhone
    }, password: hashPassword
  }

  let newBusiness = await new Business(newUser)
  await newBusiness.save().then(data => {
    return res.status(200).json(data)
  }).catch(err => {
    console.log(err)
  })
});

BusinessRouter.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  let findUser = await Business.findOne({ email })
  console.log('finduser', findUser)
  if (findUser) {
    let comparePassword = bcrypt.compare(password, findUser.password)
    if (comparePassword) {
      let userForToken = {
        user: findUser.email,
        id: findUser._id
      }

      let token = jwt.sign(userForToken, JWT_SECRET)
      res.status(200).json({ ...findUser, token })
    }
    return res.status(400).json({ err: 'Incorrect password' })
  }
})

BusinessRouter.get('/profile', async (req, res, next) => {

})



module.exports = BusinessRouter;