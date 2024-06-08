import { ICrud } from "./dependencies/ICrud";
import { MedicalAppointmentStateType } from "./types/medical-appointment-state-type";
import { MedicalAppointmentType } from "./types/medical-appointment-type";

export class MedicalAppointment implements ICrud<MedicalAppointmentType> {
  private medicalAppointment: MedicalAppointmentType | null = null;

  constructor(medicalAppointment: MedicalAppointmentType) {
    this.medicalAppointment = medicalAppointment;
  }

  getMedicalAppointmentType(): MedicalAppointmentType {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    return this.medicalAppointment;
  }

  getMonth(): number {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    return parseInt(this.medicalAppointment.date.month);
  }

  getYear(): number {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    return parseInt(this.medicalAppointment.date.year);
  }

  getDay(): number {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    return parseInt(this.medicalAppointment.date.day);
  }

  getState(): string {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    return this.medicalAppointment.state;
  }

  setState(state: MedicalAppointmentStateType) {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.medicalAppointment.state = state;

    this.check();
  }

  async create(): Promise<MedicalAppointmentType> {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.check();
    return this.medicalAppointment;
  }

  private check() {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    if (
      !this.medicalAppointment.dniPatient ||
      !this.medicalAppointment.namesPatient
    ) {
      throw new Error(
        "Los datos del paciente cédula y nombres son obligatorios para crear la cita"
      );
    }
    if (!this.medicalAppointment.date) {
      throw new Error("La fecha de la cita es obligatoria");
    }
    if (
      !this.medicalAppointment.date.day ||
      !this.medicalAppointment.date.month ||
      !this.medicalAppointment.date.year
    ) {
      throw new Error(
        "El día, mes y año son obligatorios para la fecha de la cita"
      );
    }

    if (this.medicalAppointment.date.day.length !== 2) {
      throw new Error("El día debe ser de 2 dígitos");
    }

    try {
      Number(this.medicalAppointment.date.day);
      Number(this.medicalAppointment.date.month);
      Number(this.medicalAppointment.date.year);
    } catch (error) {
      throw new Error("Los valores del día, mes y año deben ser dígitos");
    }

    if (!this.esValidoFormatoHHMM(this.medicalAppointment.timeStart)) {
      throw new Error("El formato de la hora de inicio debe ser HH:MM");
    }

    if (
      !this.medicalAppointment.state ||
      !this.isValidState(this.medicalAppointment)
    ) {
      throw new Error(
        "El estado de la cita es obligatorio o el estado no corresponde con el formato correcto"
      );
    }
  }

  private isValidState(
    appointment: MedicalAppointmentType
  ): appointment is MedicalAppointmentType & {
    state: "PENDIENTE" | "SE PRESENTO" | "NO SE PRESENTO";
  } {
    return (
      appointment.state === "PENDIENTE" ||
      appointment.state === "SE PRESENTO" ||
      appointment.state === "NO SE PRESENTO"
    );
  }

  private esValidoFormatoHHMM(cadena: string): boolean {
    const expReg = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return expReg.test(cadena);
  }

  async read(): Promise<MedicalAppointmentType> {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.check();
    return this.medicalAppointment;
  }

  async update(item: MedicalAppointmentType): Promise<MedicalAppointmentType> {
    this.medicalAppointment = { ...this.medicalAppointment, ...item };
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.check();
    return this.medicalAppointment;
  }

  async delete(): Promise<boolean> {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.medicalAppointment = null;
    return this.medicalAppointment === null;
  }
}
