import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginUrl = environment.apiURL + '/auth/login';
  getUsersUrl = environment.apiURL + '/auth/getAllUsers';
  addUserUrl = environment.apiURL + '/auth/addUser';



  logout() {
    localStorage.clear();
  }

  getAllUsers() {
    return this.http.get(this.getUsersUrl)
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  addUser(body) {
    return this.http.post(this.addUserUrl, body);
  }
}
