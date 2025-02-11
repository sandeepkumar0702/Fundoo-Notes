import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      // select: false
    },
  },
  {
    timestamps: true,
  }
);
export default model('User',userSchema);