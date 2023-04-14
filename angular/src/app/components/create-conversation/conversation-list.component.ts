import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Conversation } from 'src/app/types/Conversation';

@Component({
    selector: 'conversation-list',
    templateUrl: './conversation-list.component.html',
    styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
    onChange($event: Conversation) {
        this.messageService.getConversation($event.id).then((conversation) => {
            this.srcChange.emit(conversation as Conversation);
        });
    }
    
    @Input() src!: Conversation | null;
    @Output() srcChange: EventEmitter<Conversation> = new EventEmitter<Conversation>();
    
    name: string = "";
    conversations: Conversation[] = [];
    
    ngOnInit(): void {
        this.updateConversations();
    }
    
    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private authService: AuthService 
        ) { }
        
        async onAddConversation() {
            this.messageService.createConversation(new Conversation(this.name, await this.userService.getUsers(), [])).then(() => {;
                this.updateConversations();
            });
        }
        
        private updateConversations() {
            this.messageService.getConversations(this.authService.currentUser.id).then((conversations) => {
                this.conversations = conversations;
            });
        }
    }
    