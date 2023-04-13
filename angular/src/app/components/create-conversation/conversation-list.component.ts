import { Component, Input } from '@angular/core';
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
    this.messageService.createConversation(new Conversation(this.name, await this.userService.getUsers())).then(() => {;
      this.updateConversations();
    });
  }

  private updateConversations() {
    this.messageService.getConversations(this.authService.currentUser.id).then((conversations) => {
      this.conversations = conversations;
    });
  }

  onSelectConversation() {
    throw new Error("Method not implemented.");
  }
}
