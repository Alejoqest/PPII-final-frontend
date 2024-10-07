import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../modelos/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url : string = 'http://localhost:8080/api/v1/categorias'

  constructor(private http : HttpClient) { }

  getCategorias() {
    return this.http.get<Categoria[]>(this.url + '/describir/lista');
  }

  getCategoriasSearch(query : string) {
    return this.http.get(this.url);
  }
}
