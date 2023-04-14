import { Message } from "./Message";
import { User } from "./User";

export class Conversation {
    
  id: string = "";
  name: string;
  members: User[];
  messages: Message[];

  constructor(name: string, members: User[], messages: Message[]) {
    this.name = name;
    this.members = members;
    this.messages = messages
  }

  static create() : Conversation {
    return new Conversation("", [], []);
  }
}