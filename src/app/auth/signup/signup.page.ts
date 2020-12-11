import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {

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

  user:any = {
    email: null,
    name: null,
    count_num: null,
    password: null,
    passwordconfirm: null
  }

  signupSubscription:Subscription;

  loading:any;

  constructor(public alertController: AlertController, private _usersService:UsersService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.signupSubscription.unsubscribe();
  }

  signup( fSignup: NgForm ) {
    if (fSignup.invalid) {return;}

    if (this.user.password !== this.user.passwordconfirm) {
      this.errorAlert('Problema en contraseña', 'Las contraseñas no son iguales.');
    } else {

      this.presentLoading();
      
      const data:string = `&name=${this.user.name}&email=${this.user.email}&count_num=${this.user.count_num}&password=${this.user.password}`;  
    
      this.signupSubscription = this._usersService.registerUser(data).subscribe(resp => {

        this.closeLoading();

        const response:any = resp;
        if (response.error) {
          this.errorAlert(response.title, response.message);
        } else {
          this.successAlert(response.title, response.message);
        }
      });
    }
  }

  async errorAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 3000
    });
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }

  seleccionarAvatar( avatar ){
    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;
  }


}
