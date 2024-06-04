import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOralSymp extends Document {
  patient: mongoose.Types.ObjectId;
  halitosis: boolean;
  bleedingGums: boolean;
  xerostomia: boolean;
  bruxismo: boolean;
  hypersensitivity: {
    cool: boolean;
    hot: boolean;
    sweet: boolean;
    acid: boolean;
    touch: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const oralSympSchema: Schema<IOralSymp> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    halitosis: { type: Schema.Types.Boolean, default: false },
    bleedingGums: { type: Schema.Types.Boolean, default: false },
    xerostomia: { type: Schema.Types.Boolean, default: false },
    bruxismo: { type: Schema.Types.Boolean, default: false },
    hypersensitivity: {
      cool: { type: Schema.Types.Boolean, default: false },
      hot: { type: Schema.Types.Boolean, default: false },
      sweet: { type: Schema.Types.Boolean, default: false },
      acid: { type: Schema.Types.Boolean, default: false },
      touch: { type: Schema.Types.Boolean, default: false },
    },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

oralSympSchema.pre<IOralSymp>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const OralSymp: Model<IOralSymp> = mongoose.model<IOralSymp>("OralSymp", oralSympSchema);

export default OralSymp;