import { Schema, model, Model } from 'mongoose';
import { User } from "../../../../Domain/Entities/User";
import { UserModelI } from '../../../Interfaces/DataSources/Mongodb/UserModelInterface';


export class UserModel implements UserModelI {
  public userSchema: Schema;
  public model: Model<User>;

  constructor() {
    this.userSchema = new Schema<User>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String }
    });
    this.model = model<User>('User', this.userSchema);
  }
}
