import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/main/app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AddFriendsComponent } from './components/add-friends/add-friends.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { MessageHistoryViewportComponent } from './components/message-history-viewport/message-history-viewport.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    AddFriendsComponent,
    ConversationListComponent,
    SendMessageComponent,
    MessageHistoryViewportComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
