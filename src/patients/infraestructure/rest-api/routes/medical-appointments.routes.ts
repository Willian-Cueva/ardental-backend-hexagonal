import express from 'express';
import { container } from '../../../../core/dependency-injection/container';

/**
 * Router: Medical Appointments Routes
 *
 * Define las rutas HTTP para el módulo de citas médicas.
 */

const medicalAppointmentsRouter = express.Router();

// Obtener el controlador del container (inyección de dependencias)
const { medicalAppointmentsController } = container;

// Definir rutas
medicalAppointmentsRouter.get('/:year/:month', (req, res) =>
  medicalAppointmentsController.getAppointmentsByMonthAndYear(req, res)
);

medicalAppointmentsRouter.get('/all', (req, res) =>
  medicalAppointmentsController.getAllAppointments(req, res)
);

export { medicalAppointmentsRouter };
