import { User } from "./User";

export class Message
{
    static create() : Message {
        return new Message("", User.create(), new Date());
    }

    id: string = "";
    message: string;
    sender: User;
    timestamp: Date;

    constructor(message: string, sender: User, timestamp: Date) {
        this.message = message;
        this.sender = sender;
        this.timestamp = timestamp;
    }
}