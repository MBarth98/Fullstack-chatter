import { User } from "./User";

export class Message
{
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