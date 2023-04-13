import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AddFriendsComponent } from './components/add-friends/add-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    AddFriendsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
