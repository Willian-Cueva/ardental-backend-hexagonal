import { RolType } from "./rol-type";
import { SexType } from "./sex-type";

export type UserSchemaType  ={
  _id: string;
  name: string;
  lastname: string;
  dni: string;
  dateBorn: string;
  phone: string;
  rol: RolType;
  changePassword: Boolean;
  sex: SexType;
  createdAt: Date;
  updatedAt: Date;
}
