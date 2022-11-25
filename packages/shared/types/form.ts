import { IAuthDto } from "./dto";

export interface ISignInForm extends Pick<IAuthDto, "username" | "password"> {}

export interface ISignUpForm extends Pick<IAuthDto, "username" | "password"> {
  repeatPassword: string;
}
