import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users/users.service';
import { ClassroomsService } from '../../services/classrooms/classrooms.service';
import { ReportsService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  classrooms: any = [];

  report:any = {
    description: null,
    classroom: null
  }

  loading:any;

  classroomsSubscription: Subscription;
  createReportSubscription: Subscription;

  constructor(private _classroomsService: ClassroomsService,
              private _usersService: UsersService,
              private _reportsService: ReportsService,
              public alertController: AlertController,
              public loadingController: LoadingController) {}

  ngOnInit() {
    this.getClassrooms();
  }

  ngOnDestroy() {
    this.classroomsSubscription.unsubscribe();
    this.createReportSubscription.unsubscribe();
  }

  getClassrooms() {
    this.classroomsSubscription = this._classroomsService.getClassrooms().subscribe(response => {
      this.classrooms = response;
    });
  }

  createReport(fCreateReport:NgForm) {
    if (fCreateReport.invalid) {return;}

    this.presentLoading();

    const data:string = `&id_user=${this._usersService.id}&id_classroom=${this.report.classroom}&description=${this.report.description}`;
    
    this.createReportSubscription = this._reportsService.createReport(data).subscribe(resp => {

      this.closeLoading();

      const response:any = resp;
      if (response.error) {
        this.errorAlert(response.title, response.message);
      } else {
        this.successAlert(response.title, response.message);

        this.report = {
          description: null,
          classroom: null
        }
      }
    });
  }


  async successAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorAlert(title:string, message:string) {
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

}
