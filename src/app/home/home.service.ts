import { FilmeSerie } from './../models/filmeSerie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseURL = '';
  filmeSerie = new FilmeSerie();

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseUrl}`;
  }

  buscarFilmes() {
    return this.http.get<any>(`${this.baseURL}/api/filme`);
  }

  deletar(id:number) {
    return this.http.delete<FilmeSerie>(`${this.baseURL}/api/filme/${id}`);
  }

  atualizar(id:number, filmeSerie:FilmeSerie){

  }

}
