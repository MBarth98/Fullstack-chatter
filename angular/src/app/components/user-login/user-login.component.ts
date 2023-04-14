import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  email: string = "";

  constructor(private authService: AuthService) { }

  async onLogin() {
    await this.authService.login(this.email, "password").then(() => {});
  }
}
