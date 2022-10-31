import { UserLogInCredentials } from "./userLogInCredentials";

export class UserRegistrationCredentials extends UserLogInCredentials {
  constructor(
    email: string,
    password: string,
    username: string,
    repeat_password: string,
    agreement_confirmation: boolean
  ) {
    super(email, password);
  }
}