import { Component, Input } from '@angular/core';
import { FireService, User } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input() dest_email: string = "";
  @Input() src_email: string = "";

  onAddFriend() {
    this.fire.addFriend(this.src_email, this.dest_email);
  }


  @Input() name: string = "";
  @Input() email: string = "";

  onAddUser() {
    this.fire.addUser(this.name, this.email);
  }

  constructor(private fire: FireService) {
    fire.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(JSON.stringify(user));
      });
    });
  }
}
