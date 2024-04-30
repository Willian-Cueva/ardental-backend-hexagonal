import { UserSchemaType } from "./user-schema-type";

export type UserType = Omit<UserSchemaType, "_id" | "createdAt" | "updatedAt">;
