import mongoose, { Document, Model, Types, mongo } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  role: 'admin' | 'agent' | 'user';
  googleId: string;
  displayName: string;
  email: string;
  photo: string;
}

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'agent', 'user'],
    default: 'user',
  },
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
});

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export default User;
