import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  /*
    AQUI PRA USAR COM A VERSAO DO CURSO 
    authenticate(creds: Credenciais) {       
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  } */

  authenticate(creds: Credenciais) {       
    return this.http.post(`${API_CONFIG.baseUrl}/v1/users/auth`, creds, {
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
      console.log("AuthService CHECA TOKEN EXPIRADO sim OU nao ");
      let checa = this.jwtService.isTokenExpired(token);
      if (checa){
        console.log("AuthService TOKEN EXPIRADO");
      }else{
        console.log("AuthService TOKEN NAO EXPIRADO");
      }
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }
}
