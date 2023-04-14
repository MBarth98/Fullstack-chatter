import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Conversation } from 'src/app/types/Conversation';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentConversation: Conversation | null = null;
  
  conversationChanged($event: Conversation) {
    this.messageService.getConversation($event.id).then((conversation) => {
      this.currentConversation = conversation as Conversation;
      console.log(this.currentConversation);
    });
  }
  
  constructor(private messageService: MessageService, private userService: UserService, public authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(user);
      });
    });
  }
}
