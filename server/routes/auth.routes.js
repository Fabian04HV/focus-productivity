const express = require('express')
const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../models/User.model')
const router = express.Router()


router.post('/signup', async (req, res) => {
  const { firstname, email, password } = req.body

  // Input Validation
  if (!firstname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email Validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Secure Password Regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password not complex enough" });
  }

  try {
    const foundUser = await User.findOne({ email })

    if(foundUser){
      res.status(400).json({ message: "Email is already used" })
      return;
    }

    const sanitizedFirstname = validator.escape(firstname)
    const hashedPassword = await bcrypt.hash(password, 10)

    const cleanedUser = {
      firstname: sanitizedFirstname,
      email: email.toLowerCase(),
      password: hashedPassword
    }

    const newUser = await User.create(cleanedUser)
    res.status(201).json({ message: "User created successfully", userId: newUser._id })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error"})
  }
})

module.exports = router