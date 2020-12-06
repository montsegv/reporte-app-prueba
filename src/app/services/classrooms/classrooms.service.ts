import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  constructor(private http:HttpClient) { }

  getClassrooms() {
    return this.http.get(`${environment.urlserver}classrooms.php`);
  }

}
