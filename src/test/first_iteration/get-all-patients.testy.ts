import { GetAllPatients } from "../../patients/app/patients/get-all-patients"; 
import { Patient } from "../../patients/domain/patient"; 
import { IRepository } from "../../patients/domain/repositories/irepository"; 
import { mock } from "jest-mock-extended";

describe("GetAllPatients", () => {
  let patientRepository: IRepository<Patient>;
  let getAllPatients: GetAllPatients;

  beforeEach(() => {
    patientRepository = mock<IRepository<Patient>>();
    getAllPatients = new GetAllPatients(patientRepository);
  });

  it("debe llamar al método findAll del repositorio de pacientes", async () => {
    await getAllPatients.run();
    expect(patientRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("debe devolver un objeto de tipo lista de pacientes", async () => {
    // Configura el mock para devolver un arreglo vacío
    patientRepository.findAll = jest.fn().mockResolvedValue([]);
  
    const result = await getAllPatients.run();
    const expectedResult: Patient[] = [];
    expect(result).toEqual(expectedResult);
  });

  it("debe devolver una lista con pacientes", async () => {
    const mockPatients: Patient[] = [
      new Patient({
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      }),
    ];
  
    patientRepository.findAll = jest.fn().mockResolvedValue(mockPatients);
  
    const result = await getAllPatients.run();
    expect(result).toEqual(mockPatients);
  });
  
  
});