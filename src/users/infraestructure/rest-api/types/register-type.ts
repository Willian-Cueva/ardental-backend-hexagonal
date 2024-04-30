import { SexType } from "@src/users/domain/types/sex-type"

export type RegisterType = {
  name:string
  lastname:string
  dni:string
  dateBorn:string
  phone:string
  email:string
  password:string
  sex:SexType
  repeatPassword:string
}
