import { AccountSchemaType } from "./account-schema-type";

export type AccountType = Pick<AccountSchemaType, "email" | "password">