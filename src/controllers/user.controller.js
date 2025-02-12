import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};


//loginiser
export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    // console.log(data.token);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

///getallusers
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};



//forgot pass
export const forgotPassword = async (req, res) => {
  try {
      const response = await UserService.forgotPassword(req.body);
      res.json(response);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Server error' });
  }
};


//reste pass
export const resetPassword = async (req, res) => {
  try {
      const response = await UserService.resetPassword(req.body);
      res.json(response);
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Server error' });
  }
};
