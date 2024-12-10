import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }
  
  authenticate(creds: Credenciais) {       
    return this.http.post(`${environment.baseUrl}/v1/users/auth`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  findByEmail(email: any) {
    return this.http.get(`${environment.baseUrl}/v1/users/email/${email}`, {
      observe: 'response',
      responseType: 'text'
    });
  }

  save(creds: Credenciais) {       
    return this.http.post(`${environment.baseUrl}/v1/users`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  saveResetPwd(creds: Credenciais) {       
    return this.http.post(`${environment.baseUrl}/v1/users/reset_pwd`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {       
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }
}
