import express from 'express';
import { container } from '../../../../core/dependency-injection/container';

/**
 * Router: Patients Routes
 *
 * Define las rutas HTTP para el módulo de pacientes.
 *
 * En arquitectura hexagonal:
 * - Este es parte del adaptador de entrada (driving adapter)
 * - Obtiene el controlador del container de dependencias
 * - NO instancia controladores directamente
 */

const patientsRouter = express.Router();

// Obtener el controlador del container (inyección de dependencias)
const { patientsController } = container;

// Definir rutas
patientsRouter.get('/all-patients', (req, res) => patientsController.getAllPatients(req, res));

export { patientsRouter };
