import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private _userService: UsersService, private navCtrl: NavController) {}

  async canLoad(): Promise<boolean>{
    const active = await this._userService.active();
    if (active) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/welcome', {animated: true});
      return false;
    }
  }
  
}
