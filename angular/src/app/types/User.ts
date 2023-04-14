
export class User {
  id: string = "";
  name: string;
  email: string;
  friends: User[];
  
  constructor(name: string, email: string, friends: User[]) {
    this.name = name;
    this.email = email;
    this.friends = friends;
  }
  
  static create() {
    return new User("", "", []);
  }
}