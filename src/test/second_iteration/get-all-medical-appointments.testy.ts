import { GetAllMedicalAppointments } from "../../patients/app/medical-appointments/get-all-medical-appointments";
import { IRepository } from "../../patients/domain/repositories/irepository";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";

// Mock del repositorio
class MockMedicalAppointmentRepository implements IRepository<MedicalAppointment> {
  findAll = jest.fn();
  findById = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();

  save(_t: MedicalAppointment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetAllMedicalAppointments", () => {
  let mockRepository: MockMedicalAppointmentRepository;
  let getAllMedicalAppointments: GetAllMedicalAppointments;
  const mockAppointments: MedicalAppointment[] = [
    new MedicalAppointment({
      dniPatient: "1234567890",
      namesPatient: "John Doe",
      date: { day: "01", month: "01", year: "2024" },
      timeStart: "10:00",
      observations: "Checkup",
      state: "PENDIENTE",
    }),
    new MedicalAppointment({
      dniPatient: "9876543210",
      namesPatient: "Jane Smith",
      date: { day: "15", month: "02", year: "2024" },
      timeStart: "14:30",
      observations: "Follow-up",
      state: "SE PRESENTO",
    }),
  ];

  beforeEach(() => {
    mockRepository = new MockMedicalAppointmentRepository();
    getAllMedicalAppointments = new GetAllMedicalAppointments(mockRepository);
  });

  it("debería llamar al método findAll del repositorio", async () => {
    mockRepository.findAll.mockResolvedValue(mockAppointments);

    await getAllMedicalAppointments.run();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("debería devolver todas las citas médicas cuando el repositorio responde correctamente", async () => {
    mockRepository.findAll.mockResolvedValue(mockAppointments);

    const result = await getAllMedicalAppointments.run();

    expect(result).toEqual(mockAppointments);
  });

  it("debería manejar errores si el repositorio lanza una excepción", async () => {
    const errorMessage = "Error al obtener citas médicas";
    mockRepository.findAll.mockRejectedValue(new Error(errorMessage));

    await expect(getAllMedicalAppointments.run()).rejects.toThrow(errorMessage);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
