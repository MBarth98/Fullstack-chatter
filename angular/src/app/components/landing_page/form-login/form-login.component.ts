import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class UserLoginComponent {

  email: string = "";

  constructor(private authService: AuthService) { }

  async onLogin() {
    await this.authService.login(this.email, "password").then(() => {});
  }
}
