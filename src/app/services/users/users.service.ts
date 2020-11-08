import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  registerUser(data:string) {
    let url:string = environment.urlserver + "signup.php";
    let body:string = data;
    let type:string = "application/x-www-form-urlencoded; charset=UTF-8";
    let headers = new HttpHeaders({'Content-Type':type});

    return this.http.post(url, body, {headers}).pipe(map(data => data));
  }
}
