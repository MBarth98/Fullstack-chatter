import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class AddFriendsComponent {

  dest_email: string = "";

  constructor(private userService: UserService, private authService: AuthService) {}
  
  onAddFriend() {
    this.userService.addFriend(this.authService.currentUser.email, this.dest_email);
  }

}
