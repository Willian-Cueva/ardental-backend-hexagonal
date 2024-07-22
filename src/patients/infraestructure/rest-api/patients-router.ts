import express from "express";
import {medicalAppointmentsController} from "./medical-appointments-controller";
import {patientsController} from "./patients-controller";
const patientsRouter = express.Router();

patientsRouter.get(
  "/medical-appointment/:year/:month",
  medicalAppointmentsController.getCalendar
);

patientsRouter.get("/all-patients", patientsController.allPatients);

export { patientsRouter };
