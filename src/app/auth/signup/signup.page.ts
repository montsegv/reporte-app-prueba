import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlide;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  }

  constructor() { }

  ngOnInit() {
  }

  login( fLogin: NgForm ) {
      console.log(fLogin.valid);
  }

  registro( fRegistro: NgForm ) {
      console.log( fRegistro.valid );
  }

  seleccionarAvatar( avatar ){
    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;
  }


}
