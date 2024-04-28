import express from "express";
import path from "path";
import { ConnectToNodeServerAdapter } from "./repository/infraestructure/adapters/drivers/connect-to-node-server-adapter";

const app = express();
const PORT = 3001;

const connectToServer = new ConnectToNodeServerAdapter();
connectToServer.connect();

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use("/api/users",);
// app.use("/api/patients",);

app.use(express.static(path.join(__dirname, "..", "assets")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));