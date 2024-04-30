import { AccountType } from "./account-type";
import { UserSchemaType } from "./user-schema-type";

export type UserSessionType = Pick<UserSchemaType, "rol" | "sex"> &
  Pick<AccountType, "email"> & {
    fullname: string;
    token?: string;
  };
