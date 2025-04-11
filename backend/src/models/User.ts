import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // เก็บรหัสผ่าน
});

export const User = mongoose.model('User', userSchema, 'user');