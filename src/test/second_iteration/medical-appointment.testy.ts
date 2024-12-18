// Importamos las dependencias necesarias
import { MedicalAppointment } from "../../patients/domain/medical-appointment";
import { MedicalAppointmentType } from "../../patients/domain/types/medical-appointment-type";

describe("MedicalAppointment", () => {
  const validAppointment: MedicalAppointmentType = {
    dniPatient: "1234567890",
    namesPatient: "John Doe",
    date: { day: "01", month: "01", year: "2024" },
    timeStart: "10:00",
    observations: "Checkup",
    state: "PENDIENTE",
  };

  it("debería crear una instancia válida", () => {
    const appointment = new MedicalAppointment(validAppointment);
    expect(appointment.getMedicalAppointmentType()).toEqual(validAppointment);
  });

  it("debería lanzar error si faltan datos obligatorios al crear", () => {
    const invalidAppointment = { ...validAppointment, dniPatient: "" };
    expect(() => new MedicalAppointment(invalidAppointment)).toThrow(
      "Los datos del paciente cédula y nombres son obligatorios para crear la cita"
    );
  });

  it("debería verificar formato de fecha incorrecto", () => {
    const invalidAppointment = { ...validAppointment, date: { day: "1", month: "01", year: "2024" } };
    expect(() => new MedicalAppointment(invalidAppointment)).toThrow("El día debe ser de 2 dígitos");
  });

  it("debería lanzar error si el formato de hora no es válido", () => {
    const invalidAppointment = { ...validAppointment, timeStart: "25:00" };
    expect(() => new MedicalAppointment(invalidAppointment)).toThrow("El formato de la hora de inicio debe ser HH:MM");
  });

  it("debería actualizar correctamente el estado", async () => {
    const appointment = new MedicalAppointment(validAppointment);
    appointment.setState("SE PRESENTO");
    expect(appointment.getState()).toBe("SE PRESENTO");
  });

  it("debería eliminar correctamente una cita", async () => {
    const appointment = new MedicalAppointment(validAppointment);
    expect(await appointment.delete()).toBe(true);
  });
  
  it("debería lanzar error al intentar leer una cita no existente", async () => {
    const appointment = new MedicalAppointment(validAppointment);
    await appointment.delete();
    await expect(appointment.read()).rejects.toThrow("ClinicalSigns not found");
  });

  it("debería lanzar error si se intenta actualizar con un estado inválido", () => {
    const appointment = new MedicalAppointment(validAppointment);
    expect(() => appointment.setState("INVALIDO" as any)).toThrow(
      "El estado de la cita es obligatorio o el estado no corresponde con el formato correcto"
    );
  });
});
