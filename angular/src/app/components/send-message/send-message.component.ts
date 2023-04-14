import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Conversation } from 'src/app/types/Conversation';
import { Message } from 'src/app/types/Message';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {
    message: any;
    @Input() src: Conversation = new Conversation("", [], []);
    @Output() srcChange: EventEmitter<Conversation> = new EventEmitter<Conversation>();
    
    sendMessage() {
        this.messageService.sendMessage(this.src.id, new Message(this.message, this.src.members[0], new Date()));
        this.messageService.getConversation(this.src.id).then((conversation) => {
            this.src = conversation as Conversation;
        });
        this.srcChange.emit(this.src);
    }
    
    constructor(private messageService: MessageService) {}
}
