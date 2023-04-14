import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Conversation } from 'src/app/types/Conversation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentConversation: Conversation | null = null;
  
  conversationChanged($event: Conversation) {
    console.log($event);
    this.currentConversation = $event;
  }
  
  constructor(private userService: UserService, public authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(JSON.stringify(user));
      });
    });
  }
}
