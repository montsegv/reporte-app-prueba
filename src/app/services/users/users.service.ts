import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id:string;
  name:string;
  email:string;
  count_num:string;
  token:string;

  loading:any;

  constructor(private http:HttpClient, private storage: Storage, public loadingController: LoadingController, public alertController: AlertController,  private navCtrl: NavController) {

  }


  registerUser(data:string) {
    let url:string = environment.urlserver + "signup.php";
    let body:string = data;
    let type:string = "application/x-www-form-urlencoded; charset=UTF-8";
    let headers = new HttpHeaders({'Content-Type':type});

    return this.http.post(url, body, {headers}).pipe(map(data => data));
  }

  async active():Promise<boolean> {
    await this.loadStorage();
    if(this.token && this.token !== null){
      return Promise.resolve(true);
    }else{
      return Promise.resolve(false);
    }
  }

  logIn(data:string) {
    let url:string = environment.urlserver + "login.php";
    let body:string = data;
    let type:string = "application/x-www-form-urlencoded; charset=UTF-8";
    let headers = new HttpHeaders({'Content-Type':type});

    this.presentLoading();

    return this.http.post(url, body, {headers}).pipe(map(async(response) => {
      const data:any = response;

      this.closeLoading();
      
      if (data.error) {
        this.storage.clear();
        this.errorAlert(data.title, data.message);
      } else {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.count_num = data.count_num;
        this.token = data.token;

        await this.saveStorage();
        this.navCtrl.navigateRoot('/tabs');
      }
    }));
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

  async errorAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async saveStorage() {
    await this.storage.set('id_user', this.id);
    await this.storage.set('name', this.name);
    await this.storage.set('email', this.email);
    await this.storage.set('count_num', this.count_num);
    await this.storage.set('token', this.token);
  }

  loadStorage() {
    return new Promise(async(resolve, reject) => {
      this.storage.get('id_user').then(id_user => {
        this.id = id_user;
      });
      this.storage.get('name').then(name => {
        this.name = name;
      });
      this.storage.get('email').then(email => {
        this.email = email;
      });
      this.storage.get('count_num').then(count_num => {
        this.count_num = count_num;
      });
      this.storage.get('token').then(token => {
        this.token = token;
        resolve();
      });
    });
  }

}
