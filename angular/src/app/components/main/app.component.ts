import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userService: UserService) {
    userService.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(JSON.stringify(user));
      });
    });
  }
}
