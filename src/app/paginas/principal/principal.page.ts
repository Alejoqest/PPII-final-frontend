import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../core/modelos/pelicula.model';
import { Categoria } from '../../core/modelos/categoria.model';
import { PeliculaService } from '../../core/servicios/pelicula/pelicula.service';
import { CategoriaService } from '../../core/servicios/categoria/categoria.service';
import { WrapperComponent } from '../../compartido/componentes/wrapper/wrapper.component';
import { FormatosListaComponent } from './componentes/formatos-lista/formatos-lista.component';
import { GenerosListaComponent } from './componentes/generos-lista/generos-lista.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';

const FORMATOS = [
  'DVD',
  'BLURAY',
  'UHD'
]

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [PresentacionComponent, WrapperComponent, FormatosListaComponent, GenerosListaComponent],
  //templateUrl: './principal.component.html',
  template: `
  <presentacion/>
  <div class="section">
    <div class="section__header">
      <h1>
        Ultimas Peliculas
      </h1>
    </div>
    <movie-search-wrapper [resultados]="ultimasPeliculas" [busqueda]="busquedaPelicula"/>
  </div>
  <hr>
  <div class="section">
    <div class="section__header">
      <h1>
        Formatos de peliculas
      </h1>
    </div>
    <formatos-lista [formatos]="formatos"/>
  </div>
  <hr>
  <div class="section">
    <div class="section__header">
      <h1>
        Generos de Peliculas
      </h1>
    </div>
    <generos-lista [generos]="generos" [busqueda]="busquedaGenero" [error]="errorGenero"/>
  </div>
  `,
  styleUrl: './principal.component.css'
})
export class PrincipalPage implements OnInit {
  public ultimasPeliculas : Pelicula.PeliculaBusqueda[] = [];
  public busquedaPelicula : boolean = false;
  public generos : Categoria[] = [];
  public busquedaGenero : boolean = false;
  public errorGenero : boolean = false;

  constructor(private peliculaService : PeliculaService, private categoriaService : CategoriaService) {}

  ngOnInit(): void {
    this.conseguirPeliculas();
    this.conseguirCategorias();
  }

  public conseguirPeliculas() : void {
    this.peliculaService.getPeliculaUltimas().subscribe({
      next : (val : Pelicula.PeliculaBusqueda[]) => {
        this.ultimasPeliculas = val;
        this.busquedaPelicula = true;
      }
    });
  }

  public conseguirCategorias() : void {
    this.categoriaService.getCategorias().subscribe({
      next : (val : Categoria[]) => {
        this.generos = val;
        this.busquedaGenero = true;
      },
      error : () => this.errorGenero = true,
    });
  }

  get formatos() : string[] {
    return FORMATOS;
  }
}
