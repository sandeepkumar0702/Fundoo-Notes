import User from '../models/user.model';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

//  Service to create a new user

export const newUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword; 
  // Create and save the user
  const data = await User.create(body);
  return data;
};

//login user
export const loginUser = async (body) => {
  const { email, password } = body;
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    const  err=new Error('Invalid email or password');
    err.code=400;
    // console.log(err);
    throw err;
  }
  // Compare entered password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const  err=new Error('Invalid Password');
    err.code=400;
    throw err;
  }

  //jwt token gene
  const token = jwt.sign(
    { userId: user._id, email: user.email }, // Payload
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } // Token Expiry
  );
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  return { user: userWithoutPassword,token };
};



//getallsuers
export const getAllUsers = async () => {
  return await User.find({}, "-password"); // Exclude passwords for security
};

