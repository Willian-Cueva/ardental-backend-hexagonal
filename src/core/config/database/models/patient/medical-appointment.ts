import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedicalAppointment extends Document {
  dniPatient: string;
  namesPatient: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  timeStart: string;
  observations?: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicalAppointmentSchema: Schema<IMedicalAppointment> = new Schema(
  {
    dniPatient: { type: Schema.Types.String, required: true },
    namesPatient: { type: Schema.Types.String, required: true },
    date: {
      day: { type: Schema.Types.String, required: true },
      month: { type: Schema.Types.String, required: true },
      year: { type: Schema.Types.String, required: true },
    },
    timeStart: { type: Schema.Types.String, required: true },
    observations: { type: Schema.Types.String, required: false },
    state: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

medicalAppointmentSchema.pre<IMedicalAppointment>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const MedicalAppointmentModel: Model<IMedicalAppointment> = mongoose.model<IMedicalAppointment>("MedicalAppointment", medicalAppointmentSchema);

export default MedicalAppointmentModel;