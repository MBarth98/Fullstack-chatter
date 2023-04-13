import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { UserService } from './user.service';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static user: User | null = null;

  constructor(private userService: UserService) {}

  async login(email: string, password: string) {
    await this.userService.getUser(email).then((user) => {
        AuthService.user = user;
    });
  }

  public get currentUser(): User
  {
    return AuthService.user as User;
  }

}
