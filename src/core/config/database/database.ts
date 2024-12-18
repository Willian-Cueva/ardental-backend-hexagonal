import mongoose from "mongoose";

// const URI = process.env.MONGO_URI || "mongodb://localhost:27017/ardental";
const URI = process.env.MONGO_URI;

export const connectDB = async () => {
  
  if (URI === undefined) {
    throw new Error("MONGO_URI is not defined");
  }
  
  return mongoose
    .connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => {
      console.error("MongoDB Connection Failed");
      console.log(error);
    });
};

connectDB();
