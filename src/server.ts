import express, { Express } from "express";
import path from "path";
import cors from "cors"
import { config } from "./core/config/config";
import morgan from "morgan";
import { patientsRouter } from "./patients/infraestructure/rest-api/patients-router";

export class Server {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use((_req, res, next) => {
      res.header({
        "Access-Control-Allow-Origin": "*",
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 204,
      });
      next();
    });

    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    //routes
    const api = "/api";
    this.app.use(`${api}/patients`, patientsRouter);


    this.app.use(express.static(path.join(__dirname, "..", "assets")));
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(config.server.port, () => {
        console.log(`Server running on port ${config.server.port}`);
        resolve();
      });
    })
  }
}
