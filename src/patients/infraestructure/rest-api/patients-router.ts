import express from "express";
import {patientsController} from "./patients-controller";
const patientsRouter = express.Router();

patientsRouter.get("/all-patients", patientsController.allPatients);

export { patientsRouter };
