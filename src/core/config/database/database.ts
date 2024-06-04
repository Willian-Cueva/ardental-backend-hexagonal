import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/ardental";

export const connectDB = async () => {
  
  return mongoose
    .connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => {
      console.error("MongoDB Connection Failed");
      console.log(error);
    });
};

connectDB();
