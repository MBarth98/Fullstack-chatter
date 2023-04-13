import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dialog-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  @Input() name: string = "";
  @Input() email: string = "";

  constructor(private userService: UserService) {}

  onAddUser() {
    this.userService.addUser(this.name, this.email);
  }

}
