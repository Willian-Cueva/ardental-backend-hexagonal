import { AdapterMedicalAppointmentsToMongoDB } from "../../patients/infraestructure/adapter/adapter-medical-appointment-to-mongodb";
import { IMedicalAppointment } from "../../core/config/database/models/patient/medical-appointment";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";
import { MedicalAppointmentType } from "../../patients/domain/types/medical-appointment-type";

describe("AdapterMedicalAppointmentsToMongoDB", () => {
  describe("medicalAppointmentTypeToAppointmentModel", () => {
    it("should convert MedicalAppointmentType to IMedicalAppointment", () => {
      const input: MedicalAppointmentType = {
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      };

      const expectedOutput: IMedicalAppointment = {
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      } as IMedicalAppointment;

      const result = AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("appointmentModelToMedicalAppointmentType", () => {
    it("should convert IMedicalAppointment to MedicalAppointmentType", () => {
      const input: IMedicalAppointment = {
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      } as IMedicalAppointment;

      const expectedOutput: MedicalAppointmentType = {
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      };

      const result = AdapterMedicalAppointmentsToMongoDB.appointmentModelToMedicalAppointmentType(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("appointmentsModelToMedicalAppointments", () => {
    it("should convert an array of IMedicalAppointment to MedicalAppointment instances", () => {
      const input: IMedicalAppointment[] = [
        {
          dniPatient: "1234567890",
          namesPatient: "John Doe",
          date: { day: "10", month: "11", year: "2024" },
          timeStart: "10:00",
          observations: "Checkup",
          state: "SE PRESENTO",
        } as IMedicalAppointment,
      ];

      const result = AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(MedicalAppointment);
      expect(result[0].getMedicalAppointmentType()).toEqual({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      });
    });
  });

  describe("medicalAppointmentsToAppointmentTypeList", () => {
    it("should convert an array of MedicalAppointment instances to MedicalAppointmentType", () => {
      const mockAppointment = new MedicalAppointment({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      });

      const input: MedicalAppointment[] = [mockAppointment];
      const result = AdapterMedicalAppointmentsToMongoDB.medicalAppointmentsToAppointmentTypeList(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        dniPatient: "1234567890",
        namesPatient: "John Doe",
        date: { day: "10", month: "11", year: "2024" },
        timeStart: "10:00",
        observations: "Checkup",
        state: "SE PRESENTO",
      });
    });
  });
});
