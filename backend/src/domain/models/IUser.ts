export enum LoginProvider {
  GOOGLE = "google",
  APPLE = "apple",
  FACEBOOK = "facebook",
  MYBUJO = "mybujo",
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  loginProvider: LoginProvider;
  birthdate?: string;
  location?: string;
}
