import { INote, IUser } from "./models";

export type IAuthDto = Pick<IUser, "username" | "password">;
export type ICreateNoteDto = Pick<INote, "name"> &
  Partial<Pick<INote, "body" | "categories" | "isPublic">>;

export type IUpdateNoteDto = Partial<
  Pick<INote, "name" | "body" | "categories" | "isPublic">
>;
