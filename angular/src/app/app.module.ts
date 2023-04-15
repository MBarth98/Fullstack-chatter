import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/main/app.component';
import { CreateUserComponent } from './components/landing_page/form-register/form-register.component';
import { AddFriendsComponent } from './components/playground/friends-list/friends-list.component';
import { ConversationListComponent } from './components/playground/conversation-list/conversation-list.component';
import { SendMessageComponent } from './components/playground/send-message/send-message.component';
import { MessageHistoryViewportComponent } from './components/playground/message-history-viewport/message-history-viewport.component';
import { UserLoginComponent } from './components/landing_page/form-login/form-login.component';

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
