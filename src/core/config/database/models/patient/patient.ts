import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatient extends Document{
  names: string;
  profession:string;
  dni: string;
  phone: string;
  direction: string;
  maritalStatus: string;
  sex: string;
  dateBorn: string;
  reason: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema: Schema<IPatient> = new Schema(
  {
    names: { type: Schema.Types.String, required: true },
    profession: { type: Schema.Types.String, required: true },
    dni: { type: Schema.Types.String, required: true, unique: true },
    phone: { type: Schema.Types.String, required: true },
    direction: { type: Schema.Types.String, required: true },
    maritalStatus: { type: Schema.Types.String, required: true },
    sex: { type: Schema.Types.String, required: true },
    dateBorn: { type: Schema.Types.String, required: true },
    reason: { type: Schema.Types.String, required: true },
    version: { type: Schema.Types.Number, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

patientSchema.pre<IPatient>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Patient: Model<IPatient> = mongoose.model<IPatient>("Patient", patientSchema);

export default Patient;