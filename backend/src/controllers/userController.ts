import { Request, Response } from "express";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup User
const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Use async bcrypt.hash

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    console.log(newUser);

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
    console.log(error);
  }
};

// Signin User
const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    console.log(user);

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password); // Await bcrypt.compare
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      "jwtsecret",
      { expiresIn: '30d' }
    );

    // Return user data and token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (error) {
    res.status(500).send({ message: 'Error signing in' });
    console.log(error);
  }
};

export { signupUser, signinUser };
