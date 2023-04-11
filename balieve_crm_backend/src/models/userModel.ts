import mongoose, { Document, Model, mongo } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email: string;
  photo: string;
}

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
});

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export default User;
