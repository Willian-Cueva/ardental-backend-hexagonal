import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastname: string;
  dni: string;
  dateBorn: string;
  phone: string;
  rol: string;
  changePassword: boolean;
  sex: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    lastname: { type: Schema.Types.String, required: true },
    dni: { type: Schema.Types.String, required: true, unique: true },
    dateBorn: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    rol: { type: Schema.Types.String, required: true },
    changePassword: { type: Schema.Types.Boolean, default: false },
    sex: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

userSchema.pre<IUser>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
