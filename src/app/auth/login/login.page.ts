import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:any = {
    email: null,
    password: null
  }

  
  constructor() { }

  ngOnInit() {
  }

  login(fLogin:NgForm) {
    if (fLogin.invalid) {return;}

    console.log(fLogin.value);

  }

}
