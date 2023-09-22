interface IUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  picture: string;

  constructor(id: string, email: string, name: string, picture: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.picture = picture;
  }
}
