require('dotenv').config(); // This must be the very first line
const Razorpay = require('razorpay'); // Import Razorpay
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import our User model
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors()); // Middleware to parse JSON request bodies

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/coffeehop';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // CHANGE THIS IN PRODUCTION
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Create a new Razorpay instance
const instance = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ========================
// API Routes for Authentication
// ========================

// Register User
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with that email already exists' });
    }

    user = new User({
      name,
      email,
      password, // The middleware will hash this password before it's saved
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and sign a JSON Web Token (JWT)
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// A simple middleware function to protect routes
const auth = (req, res, next) => {
  // Get the token from the header (where the browser sends it)
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // If no token is found, send a "not authorized" error
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  // If a token is found, verify it using our secret key
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Add the user's info to the request
    next(); // Pass the request to the next function (the route handler)
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// ========================
// Protected Route
// ========================
// The "auth" middleware here protects this route.
// It will run before the main function.
app.get('/api/user', auth, async (req, res) => {
  try {
    // We can now access req.user.id because the middleware added it
    const user = await User.findById(req.user.id).select('-password');
    res.json(user); // Send the user data back to the frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// ========================
// Razorpay Checkout Route
// ========================
app.post('/api/checkout', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: 'order_rcptid_11',
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ success: false, message: 'Payment failed.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));