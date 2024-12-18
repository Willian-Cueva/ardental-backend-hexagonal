import { MongoDBMedicalAppointmentRepository } from "../../patients/infraestructure/repositories/mongodb_medical_appointment_repository";
import MedicalAppointmentModel, { IMedicalAppointment } from "../../core/config/database/models/patient/medical-appointment";
import { AdapterMedicalAppointmentsToMongoDB } from "../../patients/infraestructure/adapter/adapter-medical-appointment-to-mongodb";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";
import { jest } from "@jest/globals";

jest.mock("../../../core/config/database/models/patient/medical-appointment");
jest.mock("../adapter/adapter-medical-appointment-to-mongodb");

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

  const mockDomainAppointment = new MedicalAppointment({
    dniPatient: "1234567890",
    namesPatient: "John Doe",
    date: { day: "01", month: "03", year: "2024" },
    timeStart: "10:00",
    observations: "Test observation",
    state: "SE PRESENTO",
  });

  beforeEach(() => {
    repository = new MongoDBMedicalAppointmentRepository();
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("debería retornar todas las citas médicas", async () => {
      // Arrange
      (MedicalAppointmentModel.find as jest.Mock).mockResolvedValue([mockAppointmentData]);
      (AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments as jest.Mock).mockReturnValue([mockDomainAppointment]);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(MedicalAppointmentModel.find).toHaveBeenCalled();
      expect(AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments).toHaveBeenCalledWith([mockAppointmentData]);
      expect(result).toEqual([mockDomainAppointment]);
    });

    it("debería retornar una lista vacía si no hay citas", async () => {
      // Arrange
      (MedicalAppointmentModel.find as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("findById", () => {
    it("debería retornar una cita médica si existe", async () => {
      // Arrange
      const id = "123";
      (MedicalAppointmentModel.findById as jest.Mock).mockResolvedValue(mockAppointmentData);
      (AdapterMedicalAppointmentsToMongoDB.appointmentModelToMedicalAppointmentType as jest.Mock).mockReturnValue(mockDomainAppointment.getMedicalAppointmentType());

      // Act
      const result = await repository.findById(id);

      // Assert
      expect(MedicalAppointmentModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDomainAppointment);
    });

    it("debería retornar null si no existe la cita médica", async () => {
      // Arrange
      const id = "123";
      (MedicalAppointmentModel.findById as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await repository.findById(id);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("debería guardar una nueva cita médica", async () => {
      // Arrange
      (AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel as jest.Mock).mockReturnValue(mockAppointmentData);
      (MedicalAppointmentModel.create as jest.Mock).mockResolvedValue(null);

      // Act
      await repository.save(mockDomainAppointment);

      // Assert
      expect(AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel).toHaveBeenCalledWith(mockDomainAppointment.getMedicalAppointmentType());
      expect(MedicalAppointmentModel.create).toHaveBeenCalledWith(mockAppointmentData);
    });
  });

  describe("update", () => {
    it("debería actualizar una cita médica existente", async () => {
      // Arrange
      const id = "123";
      (AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel as jest.Mock).mockReturnValue(mockAppointmentData);
      (MedicalAppointmentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      // Act
      await repository.update(id, mockDomainAppointment);

      // Assert
      expect(AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel).toHaveBeenCalledWith(mockDomainAppointment.getMedicalAppointmentType());
      expect(MedicalAppointmentModel.findByIdAndUpdate).toHaveBeenCalledWith(id, mockAppointmentData);
    });
  });

  describe("delete", () => {
    it("debería eliminar una cita médica", async () => {
      // Arrange
      const id = "123";
      (MedicalAppointmentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      // Act
      await repository.delete(id);

      // Assert
      expect(MedicalAppointmentModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
