export type UserPropsSchema = {
  _id: string;
  name: string;
  lastname: string;
  dni: string;
  dateBorn: string;
  phone: string;
  rol: "not-authorized" | "administrer" | "super-administrer";
  changePassword: boolean;
  sex: "Masculino" | "Femenino" | "Otro";
};

export type UserProps = Omit<UserPropsSchema, "_id">;

export class User {
  public userProps: UserProps;

  constructor(userProps: UserProps) {
    this.userProps = userProps;
  }

  save() {
    const { name, lastname, dni, dateBorn, phone, rol, sex } = this.userProps;

    // Validaciones
    if (!name || !lastname || !dni || !dateBorn || !phone || !rol || !sex) {
      throw new Error("Todos los campos son obligatorios.");
    }

    if (dni.length !== 10 || isNaN(Number(dni))) {
      throw new Error("El DNI debe tener 10 dígitos numéricos.");
    }

    if (
      rol !== "not-authorized" &&
      rol !== "administrer" &&
      rol !== "super-administrer"
    ) {
      throw new Error("El rol no corresponde a un rol autorizado.");
    }

    if (sex !== "Masculino" && sex !== "Femenino" && sex !== "Otro") {
      throw new Error("El sexo debe ser 'Masculino', 'Femenino' u 'Otro'.");
    }
  }
}
