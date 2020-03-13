import { Injectable } from '@angular/core';
import { environment }  from '../../environments/environment'
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginUrl = environment.apiURL + "/auth/login";


  logout() {
    localStorage.clear();
  }

  login(body) {
    console.log('body===============', body)
    return this.http.post(this.loginUrl, body);
  }

}
