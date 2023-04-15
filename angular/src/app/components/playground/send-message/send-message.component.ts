import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
    @Input() src!: Conversation | null;
    @Output() srcChange: EventEmitter<Conversation> = new EventEmitter<Conversation>();

    constructor(private messageService: MessageService, private authService: AuthService) {}
    
    async sendMessage() {        
        await this.messageService.sendMessage(this.src!.id, new Message(this.message, this.authService.currentUser, new Date()));
        
        this.forceRefresh();
    }

    forceRefresh() {
        this.messageService.getConversation(this.src!.id).then((conversation) => {
            this.srcChange.emit(conversation as Conversation);
        });
    }
    
}
