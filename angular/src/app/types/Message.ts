
export class Message
{
    id: string = "";
    message: string;
    sender: string;
    timestamp: Date;

    constructor(message: string, sender: string, timestamp: Date) {
        this.message = message;
        this.sender = sender;
        this.timestamp = timestamp;
    }
}