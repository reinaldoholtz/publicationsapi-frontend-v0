import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token) {
      console.log("TOKEN VALIDO : "+token);
      const cloneReq = 
        request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        return next.handle(cloneReq);
    } else {
      console.log("TOKEN NAO VALIDO : "+token);
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]