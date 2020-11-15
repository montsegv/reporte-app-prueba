import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  user:any = {
    email: null,
    password: null
  }

  loginSubscription:Subscription;

  
  constructor(private _userService:UsersService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  login(fLogin:NgForm) {
    if (fLogin.invalid) {return;}

    const data:string = `&email=${this.user.email}&password=${this.user.password}`;
    this.loginSubscription = this._userService.logIn(data).subscribe(() => {});
  }

}
