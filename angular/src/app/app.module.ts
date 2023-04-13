import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/main/app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AddFriendsComponent } from './components/add-friends/add-friends.component';
import { CreateConversationComponent } from './components/create-conversation/create-conversation.component';
import { SelectConversationComponent } from './components/select-conversation/select-conversation.component';
import { InviteToConversationComponent } from './components/invite-to-conversation/invite-to-conversation.component';
import { DeleteConversationComponent } from './components/delete-conversation/delete-conversation.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { MessageHistoryViewportComponent } from './components/message-history-viewport/message-history-viewport.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    AddFriendsComponent,
    CreateConversationComponent,
    SelectConversationComponent,
    InviteToConversationComponent,
    DeleteConversationComponent,
    SendMessageComponent,
    MessageHistoryViewportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
