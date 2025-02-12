import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
// router.post('', userController.newUser);
router.post('/register',newUserValidator, userController.newUser);

//login route
router.post("/login",userController.loginUser);


///getallsusers
router.get("/getUsers",userAuth,userController.getAllUsers);
// router.get("/getUsers",userController.getAllUsers);


//forgot pass
router.post('/forget',userController.forgotPassword);


//reset pass
router.post('/resetPassword', userController.resetPassword);


export default router;
