import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Definición de la interfaz para el documento de cuenta
export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  email: string;
  password: string;
}

// Esquema de la cuenta
const AccountSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware para el hash de la contraseña antes de guardar
AccountSchema.pre<IAccount>("save", async function (next) {
  try {
    const salts = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salts);
    this.password = hash;
    next();
  } catch (error) {
    console.error(error);
    // next(error);
  }
});

// Exportar el modelo de cuenta
export default mongoose.model<IAccount>("Account", AccountSchema);
