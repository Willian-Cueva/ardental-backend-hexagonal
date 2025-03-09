import express from "express";
import {medicalAppointmentsController} from "./medical-appointments-controller";
const medicalAppointmentsRouter = express.Router();

medicalAppointmentsRouter.get(
  "/:year/:month",
  medicalAppointmentsController.getAppointmentsPerMonthAndYear
);

export { medicalAppointmentsRouter };
