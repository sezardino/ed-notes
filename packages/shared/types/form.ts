import { IAuthDto, ICreateNoteDto } from "./dto";

export interface ISignInForm extends Pick<IAuthDto, "username" | "password"> {}

export interface ISignUpForm extends Pick<IAuthDto, "username" | "password"> {
  repeatPassword: string;
}

export interface ICreateNoteForm
  extends Omit<ICreateNoteDto, "body" | "categories"> {
  categories: string;
}
