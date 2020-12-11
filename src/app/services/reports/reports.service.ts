import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  createReport(data: string) {
    let url:string = environment.urlserver + "create_report.php";
    let body:string = data;
    let type:string = "application/x-www-form-urlencoded; charset=UTF-8";
    let headers = new HttpHeaders({'Content-Type':type});

    return this.http.post(url, body, {headers});
  }
}
