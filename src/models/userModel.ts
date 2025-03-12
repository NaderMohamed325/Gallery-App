import mongoose from 'mongoose';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const userZodSchema = z.object({
  userName: z
    .string()
    .min(4, { message: 'Minimum username length is 4 characters' })
    .max(15, { message: 'Maximum username length is 15 characters' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password cannot exceed 20 characters' }),
});
interface IUser extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
}
const userMongooseSchema = new mongoose.Schema({
  userName: { type: String, required: true, minlength: 4, maxlength: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userMongooseSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});




const User = mongoose.model('User', userMongooseSchema);



export { User ,userZodSchema};
