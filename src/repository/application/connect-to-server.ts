import mongoose from "mongoose";
import { IConnectToServer } from "../infraestructure/ports/drivers/for-connecto-to-server";
import dotenv from "dotenv";
dotenv.config();

export class ConnectToServer implements IConnectToServer {
  async connect(): Promise<Boolean> {
    // app.ts

    // Obtiene la URL de conexión a MongoDB desde las variables de entorno
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    // Conecta a la base de datos MongoDB
    mongoose
      .connect(MONGODB_URI)
      .then((db) => console.log("Connected to MongoDB", db))
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        return false;
      });

    module.exports = mongoose;
    return true;
  }
}
