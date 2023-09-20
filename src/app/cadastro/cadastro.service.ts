import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilmeSerie } from '../models/filmeSerie';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseURL = '';

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseUrl}`;
  }

adicionarFilmeSerie(filmeSerie: FilmeSerie){
  return this.http.post<any>(`${this.baseURL}/api/filme`, filmeSerie);
}

buscarPeloID(id:number){
  return this.http.get<any>(`${this.baseURL}/api/filme/${id}`);
}

}
