import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, public authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.userService.getUsers().then((users) => {
      users.forEach((user) => {
        console.log(JSON.stringify(user));
      });
    });
  }
}
