import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dialog-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent {

  @Input() dest_email: string = "";
  @Input() src_email: string = "";

  constructor(private userService: UserService) {}
  
  onAddFriend() {
    this.userService.addFriend(this.src_email, this.dest_email);
  }

}
