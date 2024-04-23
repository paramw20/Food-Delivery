const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

// Function to verify Google ID token
async function verifyGoogleToken(idToken) {
  const client = new OAuth2Client('142853328057-0scqefs2cv8p8kj1en1fgfpo7su2sohs.apps.googleusercontent.com'); // Replace with your actual Google OAuth client ID

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: '142853328057-0scqefs2cv8p8kj1en1fgfpo7su2sohs.apps.googleusercontent.com', // Specify your Google OAuth client ID here
  });
  const payload = ticket.getPayload();
  return payload;
}

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

// Route to handle Google Sign-In
router.post('/googlelogin', async (req, res) => {
  const { idToken } = req.body;

  try {
    const payload = await verifyGoogleToken(idToken);

    // If verification is successful, respond with user data
    if (payload) {
      const { email, name, picture } = payload;
      // Check if user already exists
      let userData = await User.findOne({ email });

      // If user doesn't exist, create new user
      if (!userData) {
        await User.create({
          name: name,
          email: email,
          // Optionally, you can save the picture URL if needed
          picture: picture
        });
      }

      // Generate JWT token
      const tokenData = {
        user: {
          email: email
        }
      };
      const authtoken = jwt.sign(tokenData, jwtSecret);

      res.json({ success: true, authtoken });
    } else {
      res.status(400).json({ success: false, error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
