import { MongoDBMedicalAppointmentRepository } from "../../patients/infraestructure/repositories/mongodb_medical_appointment_repository";
import MedicalAppointmentModel, {
  IMedicalAppointment,
} from "../../core/config/database/models/patient/medical-appointment";
import { AdapterMedicalAppointmentsToMongoDB } from "../../patients/infraestructure/adapter/adapter-medical-appointment-to-mongodb";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";
import { MedicalAppointmentType } from "../../patients/domain/types/medical-appointment-type";

jest.mock("../../core/config/database/models/patient/medical-appointment");
jest.mock(
  "../../patients/infraestructure/adapter/adapter-medical-appointment-to-mongodb.ts"
);

describe("MongoDBMedicalAppointmentRepository", () => {
  let repository: MongoDBMedicalAppointmentRepository;

  const mockAppointmentData: IMedicalAppointment = {
    dniPatient: "1234567890",
    namesPatient: "John Doe",
    date: { day: "01", month: "03", year: "2024" },
    timeStart: "10:00",
    observations: "Test observation",
    state: "SE PRESENTO",
  } as IMedicalAppointment;

  beforeEach(() => {
    repository = new MongoDBMedicalAppointmentRepository();
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("debería retornar todas las citas médicas", async () => {
      const mockAppointments: IMedicalAppointment[] = [mockAppointmentData];
      (MedicalAppointmentModel.find as jest.Mock).mockResolvedValue(
        mockAppointments
      );
      (
        AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments as jest.Mock
      ).mockReturnValue(
        mockAppointments.map(
          (appointment) =>
            new MedicalAppointment(appointment as MedicalAppointmentType)
        )
      );

      const result = await repository.findAll();
      expect(MedicalAppointmentModel.find).toHaveBeenCalledTimes(1);
      expect(
        AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments
      ).toHaveBeenCalledWith(mockAppointments);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(MedicalAppointment);
    });
  });

  describe("findById", () => {
    it("debería retornar una cita médica por ID", async () => {
      (MedicalAppointmentModel.findById as jest.Mock).mockResolvedValue(
        mockAppointmentData
      );
      (
        AdapterMedicalAppointmentsToMongoDB.appointmentModelToMedicalAppointmentType as jest.Mock
      ).mockReturnValue(mockAppointmentData);

      const result = await repository.findById("mock-id");
      expect(MedicalAppointmentModel.findById).toHaveBeenCalledWith("mock-id");
      expect(result).toBeInstanceOf(MedicalAppointment);
    });

    it("debería retornar null si no existe la cita médica", async () => {
      (MedicalAppointmentModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById("mock-id");
      expect(MedicalAppointmentModel.findById).toHaveBeenCalledWith("mock-id");
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("debería guardar una nueva cita médica", async () => {
      const mockAppointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      const mockAppointmentModel = {
        ...mockAppointment.getMedicalAppointmentType(),
      };

      (
        AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel as jest.Mock
      ).mockReturnValue(mockAppointmentModel);
      (MedicalAppointmentModel.create as jest.Mock).mockResolvedValue(mockAppointmentModel);

      await repository.save(mockAppointment);
      expect(
        AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel
      ).toHaveBeenCalledWith(mockAppointment.getMedicalAppointmentType());
      expect(MedicalAppointmentModel.create).toHaveBeenCalledWith(mockAppointmentModel);
    });
  });

  describe("update", () => {
    it("debería actualizar una cita médica existente", async () => {
      const mockAppointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      const mockAppointmentModel = {
        ...mockAppointment.getMedicalAppointmentType(),
      };

      (
        AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel as jest.Mock
      ).mockReturnValue(mockAppointmentModel);

      await repository.update("mock-id", mockAppointment);
      expect(
        AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel
      ).toHaveBeenCalledWith(mockAppointment.getMedicalAppointmentType());
      expect(MedicalAppointmentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "mock-id",
        mockAppointmentModel
      );
    });
  });

  describe("delete", () => {
    it("debería eliminar una cita médica por ID", async () => {
      (MedicalAppointmentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      await repository.delete("mock-id");
      expect(MedicalAppointmentModel.findByIdAndDelete).toHaveBeenCalledWith("mock-id");
    });
  });
  
});
