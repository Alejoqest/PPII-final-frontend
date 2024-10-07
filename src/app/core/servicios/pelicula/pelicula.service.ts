import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pelicula } from '../../modelos/pelicula.model';
import { Categoria } from '../../modelos/categoria.model';
import { Http } from '../../modelos/http.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url : string = 'http://localhost:8080/api/v1/pelicula'

  constructor(private http : HttpClient) { }

  public getPeliculas() : Observable<any> {
    return this.http.get<Pelicula.PeliculaBusqueda[]>('../../../assets/peliculaBusqueda.json');
    //return this.http.get<Pelicula.PeliculaBusqueda[]>(this.url + '/lista');
  }

  public getPeliculasBusqueda(data : Http.SearchQueries) {

    const params = this.crearParam(data);

    //return this.http.get<Pelicula.PeliculaBusqueda[]>('../../../assets/peliculaBusqueda.json');

    return this.http.get<Pelicula.PeliculaBusqueda[]>(this.url + '/mostrar/', {params : params});
  }

  public getPeliculaCantidad(data : Http.SearchQueries) {
    const params = this.crearParam(data);

    return this.http.get<{cantidad : number}>(this.url + '/mostrar/cantidad/', {params : params})
  }

  public getPeliculaUltimas() {
    return this.http.get<Pelicula.PeliculaBusqueda[]>(this.url + '/mostrar/ultimas');
  }

  public getPeliculasDatos(id : number) : Observable<Pelicula.PeliculaDatos> {
    //return this.http.get<Pelicula.PeliculaDatos[]>('../../../assets/peliculaSelect.json');
    return this.http.get<Pelicula.PeliculaDatos>(this.url + `/mostrar/${id}`);
  }

  public getPeliculaCategorias(id : number) : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + `/mostrar/${id}/categorias`);
  }

  public getPeliculaPortada(id : number) : Observable<Pelicula.PeliculaPortada> {
    return this.http.get<Pelicula.PeliculaPortada>(this.url + `/mostrar/${id}/portada`);
  }

  public postPelicula(body : FormData) : Observable<any>{
    return this.http.post(this.url + 'admin/publicar', body 
      /*{
      headers: {'Content-Type': 'multipart/form-data'}
      }*/
      );
  }
  
  public putPelicula(body : FormData) : Observable<any> {
    return this.http.put(this.url + '/actualizar', body);
  }

  private crearParam(data : Http.SearchQueries) : HttpParams {
    const paramsobj = {
      nombre : data.nombre || "",
      numPag : Number(data.numPag) || 1,
      sinStock : data.sinStock || "false",
      ordenTiempo : data.ordenTiempo || "false",
      ordenPrecio : data.ordenPrecio || "false",
    }

    let params = new HttpParams({fromObject: paramsobj});

    if (data.formato && data.formato != 'TODOS') params = params.set('formato', data.formato);
    if (data.categoriaId && data.categoriaId != "0") params = params.set('categoriaId', data.categoriaId);
    return params;
  }
}
