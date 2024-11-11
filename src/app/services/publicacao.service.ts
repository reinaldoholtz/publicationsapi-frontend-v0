import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Publicacao } from '../models/publicacao';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Publicacao> {
    console.log("CHAMA findById valor = ",id);
    return this.http.get<Publicacao>(`${API_CONFIG.baseUrl}/v1/publications/${id}`);
  }

  findAllByDescricao(query: any): Observable<Publicacao[]> {
    console.log("CHAMA findAllByDescricao");
    return this.http.get<Publicacao[]>(`${API_CONFIG.baseUrl}/v1/publications?query=${query}`);
  }

  findAll(): Observable<Publicacao[]> {
    console.log("CHAMA findAll");
    return this.http.get<Publicacao[]>(`${API_CONFIG.baseUrl}/v1/publications/all`);
  }  
}
