import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { MongoDBMedicalAppointmentRepository } from "@/patients/infraestructure/repositories/mongodb_medical_appointment_repository";

describe("MongoDBMedicalAppointmentRepository", () => {
  let repository: MongoDBMedicalAppointmentRepository;

  beforeEach(() => {
    repository = new MongoDBMedicalAppointmentRepository();
  });

  describe("findAll", () => {
    it("debería retornar una lista vacía si no hay citas médicas", async () => {
      const appointments = await repository.findAll();
      expect(appointments).toHaveLength(0);
    });

    it("debería retornar una lista de citas médicas si hay citas médicas", async () => {
      const appointment1 = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      const appointment2 = new MedicalAppointment({
        dniPatient: "0987654321",
        namesPatient: "Jane Doe",
        date: { day: "02", month: "03", year: "2024" },
        timeStart: "11:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.save(appointment1);
      await repository.save(appointment2);

      const appointments = await repository.findAll();
      expect(appointments).toHaveLength(2);
      expect(appointments[0]).toEqual(appointment1);
      expect(appointments[1]).toEqual(appointment2);
    });
  });

  describe("findById", () => {
    it("debería retornar una cita médica si existe", async () => {
      const appointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.save(appointment);

      const foundAppointment = await repository.findById(
        appointment.getMedicalAppointmentType().dniPatient
      );
      expect(foundAppointment).toEqual(appointment);
    });

    it("debería retornar null si no existe la cita médica", async () => {
      const foundAppointment = await repository.findById("1234567890");
      expect(foundAppointment).toBeNull();
    });
  });

  describe("save", () => {
    it("debería guardar una nueva cita médica", async () => {
      const appointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.save(appointment);

      const savedAppointment = await repository.findById(
        appointment.getMedicalAppointmentType().dniPatient
      );
      expect(savedAppointment).toEqual(appointment);
    });
  });

  describe("update", () => {
    it("debería actualizar una cita médica existente", async () => {
      const appointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.save(appointment);

      const updatedAppointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "Jane Doe",
        date: { day: "02", month: "03", year: "2024" },
        timeStart: "11:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.update(appointment.getMedicalAppointmentType().dniPatient, updatedAppointment);

      const updatedAppointmentFound = await repository.findById(
        appointment.getMedicalAppointmentType().dniPatient
      );
      expect(updatedAppointmentFound).toEqual(updatedAppointment);
    });
  });

  describe("delete", () => {
    it("debería eliminar una cita médica", async () => {
      const appointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "01", month: "03", year: "2024" },
        timeStart: "10:00",
        observations: "Test observation",
        state: "SE PRESENTO",
      });

      await repository.save(appointment);

      const deleted = await repository.delete(appointment.getMedicalAppointmentType().dniPatient);
      expect(deleted).toBe(true);

      const deletedAppointmentFound = await repository.findById(
        appointment.getMedicalAppointmentType().dniPatient
      );
      expect(deletedAppointmentFound).toBeNull();
    });
  });
});
