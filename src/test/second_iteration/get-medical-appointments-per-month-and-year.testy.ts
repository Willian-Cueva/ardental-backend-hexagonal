import { GetAppointmentsPerMonthAndYear } from "../../patients/app/medical-appointments/get-appointments-per-month-and-year";
import { GetAllMedicalAppointments } from "../../patients/app/medical-appointments/get-all-medical-appointments";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";

// Mock de la clase GetAllMedicalAppointments
jest.mock("../../patients/app/medical-appointments/get-all-medical-appointments.ts");

describe("GetAppointmentsPerMonthAndYear", () => {
  let getAllAppointmentsMock: jest.Mocked<GetAllMedicalAppointments>;
  let getAppointmentsPerMonthAndYear: GetAppointmentsPerMonthAndYear;

  const mockAppointments: MedicalAppointment[] = [
    new MedicalAppointment({
      dniPatient: "1234567890",
      namesPatient: "John Doe",
      date: { day: "01", month: "03", year: "2024" },
      timeStart: "10:00",
      observations: "Checkup",
      state: "PENDIENTE",
    }),
    new MedicalAppointment({
      dniPatient: "0987654321",
      namesPatient: "Jane Doe",
      date: { day: "02", month: "03", year: "2024" },
      timeStart: "11:00",
      observations: "Checkup",
      state: "SE PRESENTO",
    }),
    new MedicalAppointment({
      dniPatient: "5678901234",
      namesPatient: "Alex Smith",
      date: { day: "03", month: "02", year: "2024" },
      timeStart: "12:00",
      observations: "Analisis de sangre",
      state: "NO SE PRESENTO",
    }),
  ];

  beforeEach(() => {
    getAllAppointmentsMock = new GetAllMedicalAppointments({} as any) as jest.Mocked<GetAllMedicalAppointments>;
    getAllAppointmentsMock.run = jest.fn();
    getAppointmentsPerMonthAndYear = new GetAppointmentsPerMonthAndYear(getAllAppointmentsMock, 2024, 3);
  });

  it("debería retornar citas médicas que coincidan con el mes y año especificados", async () => {
    getAllAppointmentsMock.run.mockResolvedValue(mockAppointments);

    const result = await getAppointmentsPerMonthAndYear.run();

    expect(result).toHaveLength(2);
    expect(result[0].getMedicalAppointmentType().dniPatient).toBe("1234567890");
    expect(result[1].getMedicalAppointmentType().dniPatient).toBe("0987654321");
    expect(getAllAppointmentsMock.run).toHaveBeenCalledTimes(1);
  });

  it("debería retornar un arreglo vacío si no hay citas para el mes y año especificados", async () => {
    getAllAppointmentsMock.run.mockResolvedValue(mockAppointments);

    // Instanciamos con un mes/año que no existe
    getAppointmentsPerMonthAndYear = new GetAppointmentsPerMonthAndYear(getAllAppointmentsMock, 2025, 5);
    const result = await getAppointmentsPerMonthAndYear.run();

    expect(result).toHaveLength(0);
    expect(getAllAppointmentsMock.run).toHaveBeenCalledTimes(1);
  });

  it("debería manejar errores si getAllAppointments.run lanza una excepción", async () => {
    const errorMessage = "Error al obtener las citas";
    getAllAppointmentsMock.run.mockRejectedValue(new Error(errorMessage));

    await expect(getAppointmentsPerMonthAndYear.run()).rejects.toThrow(errorMessage);
    expect(getAllAppointmentsMock.run).toHaveBeenCalledTimes(1);
  });
});
