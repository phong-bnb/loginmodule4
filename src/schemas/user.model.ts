import { Schema, model } from 'mongoose';

interface IUser {
  username: string;

  password: string;

  google: {
    id: {
      type: string;
    };
  };
}

const userSchema = new Schema<IUser>({
  google: {
    id: {
      type: String,
    },
  },

  username: String,

  password: String,
});

const UserModel = model<IUser>('users', userSchema);

export default UserModel;
