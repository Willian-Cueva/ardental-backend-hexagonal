import { IAuth } from "./dependencies/IAuth";
import { ICheck } from "./dependencies/ICheck";
import { IUser } from "./dependencies/IUser";
import { Helpers } from "./helpers/helpers";
import { RolType } from "./types/rol-type";
import { UserType } from "./types/user-type";

export class User implements IUser,IAuth,ICheck {
  private user: UserType;

  constructor(user: UserType) {
    this.user = user;
    this.save();
  }


  async changePermissions(rol: RolType): Promise<UserType> {
    this.user.rol = rol;
    this.save();
    return this.user;
  }

  async resquePassword(): Promise<void> {
    this.user.changePassword = true;
    this.save();
    return;
  }

  getUser(): UserType {
    this.save();
    return this.user;
  }

  async updateUser(user: UserType): Promise<UserType> {
    this.user = user;
    this.save();
    return this.user;
  }

  async login(): Promise<void> {
    this.save();
    return;
  }

  async register(): Promise<void> {
    this.user.changePassword = false;
    this.user.rol = "not-authorized";
    this.save();
    return;
  }

  save() {
    if (this.user.name == "" || !Helpers.nameValidate(this.user.name)) {
      throw new Error("El nombre es obligatorio y debe tener al menos 2 letras alfabéticas");
      
    }
    if (!this.user.dni || !Helpers.dniValidate(this.user.dni))
      throw new Error(
        "La cédula del usuario debe ser de 10 dígitos y ser un número de cedula válido"
      );

    if (!this.user.phone || !Helpers.phoneValidate(this.user.phone))
      throw new Error("El nómero de telefónico debe ser de 10 dígitos");
  }
}
