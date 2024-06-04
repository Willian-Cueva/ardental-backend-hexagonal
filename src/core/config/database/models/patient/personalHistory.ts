import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPersonalHistory extends Document {
  patient: mongoose.Types.ObjectId;
  disorders: string;
  bloodPressure: "Alta" | "Normal" | "Baja";
  heartDiseases: boolean;
  medication:string;
  otherDiseases: string;
  createdAt: Date;
  updatedAt: Date;
}

const personalHistorySchema: Schema<IPersonalHistory> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    disorders: { type: Schema.Types.String, required: true },
    bloodPressure: { type: Schema.Types.String, required: true },
    heartDiseases: { type: Schema.Types.Boolean, default: false },
    medication: { type: Schema.Types.String, required: true },
    otherDiseases: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

personalHistorySchema.pre<IPersonalHistory>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const PersonalHistory: Model<IPersonalHistory> = mongoose.model<IPersonalHistory>("PersonalHistory", personalHistorySchema);

export default PersonalHistory;
