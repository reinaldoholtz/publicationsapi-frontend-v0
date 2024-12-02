import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Publicacao } from '../models/publicacao';
import { PublicacaoPage } from '../models/publicacao-page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Publicacao> {
    return this.http.get<Publicacao>(`${environment.baseUrl}/v1/publications/${id}`);
  }
  
  findAllByDescription(query: any,page = 0, pageSize = 10): Observable<PublicacaoPage> {
    const params = new HttpParams()
    .set('query', query)
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<PublicacaoPage>(`${environment.baseUrl}/v1/publications`, { params });
  }

  findAll(page = 0, pageSize = 10): Observable<PublicacaoPage> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString()); 
    return this.http.get<PublicacaoPage>(`${environment.baseUrl}/v1/publications/all`, { params });
  }  
}
