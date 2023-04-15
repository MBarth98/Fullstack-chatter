import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class CreateUserComponent {

  name: string = "";
  email: string = "";

  constructor(private userService: UserService) {}

  onAddUser() {
    this.userService.addUser(this.name, this.email);
  }

}
