import express from "express";
import {medicalAppointmentsController} from "./medical-appointments-controller";
import {patientsController} from "./patients-controller";
const patientsRouter = express.Router();

patientsRouter.post(
  "/medical-appointment",
  medicalAppointmentsController.createMedicalAppointment
);

patientsRouter.get(
  "/medical-appointment/:year/:month",
  medicalAppointmentsController.getCalendar
);
patientsRouter.get(
  "/medical-appointment/:year/:month/:day",
  medicalAppointmentsController.getAppointmentsPerDayMonthYear
);
patientsRouter.get("/medical-appointment/:year/:month/:day",medicalAppointmentsController.getAppointmentsPerMonthAndYear)

patientsRouter.get("/all-patients", patientsController.allPatients);

export { patientsRouter };
