import { Message } from "./Message";
import { User } from "./User";

export class Conversation {
    id: string = "";
    name: string;
    members: User[];
    messages: Message[] = [];
  
    constructor(name: string, members: User[]) {
      this.name = name;
      this.members = members;
    }
  }