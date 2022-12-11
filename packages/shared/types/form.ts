import { AuthInput, CreateNoteInput } from "../dto";

export interface SignInFormBody extends Pick<AuthInput, "email" | "password"> {}

export interface SignUpFormBody extends AuthInput {
  repeatPassword: string;
}

export interface CrudNoteFormBody
  extends Omit<CreateNoteInput, "body" | "categories"> {
  categories: string;
}
