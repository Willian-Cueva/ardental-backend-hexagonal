
import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
  name: string;
  lastname: string;
  dni: string;
  dateBorn: string;
  phone: string;
  rol: string;
  changePassword: Boolean;
  sex: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  name: String,
  lastname: String,
  dni: String,
  dateBorn: String,
  phone: String,
  rol: String,
  changePassword: Boolean,
  sex: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre<IUser>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IUser>("User", userSchema);
