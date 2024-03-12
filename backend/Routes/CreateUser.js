const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

router.post(
  '/createuser',
  [
    body('email', 'email must be a valid email').isEmail(),
    body('name', 'name must be at least 6 characters').isLength({ min: 3 }),
    body('password', 'password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Server Error' });
    }
  }
);

router.post(
  '/loginuser',
  [
    body('email', 'email must be a valid email').isEmail(),
    body('password', 'password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userData = await User.findOne({ email }).select('+password');
      if (!userData) return res.status(400).json({ errors: 'Invalid credentials' });

      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) return res.status(400).json({ errors: 'Invalid credentials' });

      const tokenData = {
        user: {
          id: userData.id
        }
      };
      const authtoken = jwt.sign(tokenData, jwtSecret);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Server Error' });
    }
  }
);

module.exports = router;
