import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input() dest_email: string = "";
  @Input() src_email: string = "";

  onAddFriend() {
    this.userService.addFriend(this.src_email, this.dest_email);
  }


  @Input() name: string = "";
  @Input() email: string = "";

  onAddUser() {
    this.userService.addUser(this.name, this.email);
  }

  constructor(private userService: UserService) {
    userService.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(JSON.stringify(user));
      });
    });
  }
}
