import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../../core/modelos/pelicula.model';
import { RouterModule } from '@angular/router';
import { PeliculaService } from '../../../core/servicios/pelicula/pelicula.service';
import { ImagenComponent } from '../imagen/imagen.component';

@Component({
  selector: 'pelicula-result',
  standalone: true,
  imports: [RouterModule, ImagenComponent],
  //templateUrl: './result.component.html',
  template : `
  <div class="search__result">
    <a [routerLink]="['/pelicula', datos.id]">
      <div class="result__img">
        <imagen [src]="url" [width]="15"/>
      </div>
    </a>
    <div class="result__content">
      <div class="result__header">
        <a [routerLink]="['/pelicula', datos.id]"><p>{{datos.nombre}} [{{datos.formato}}]</p></a> 
      </div>
      <div class="result__body">
        <a [routerLink]="['/pelicula', datos.id]"><p>{{datos.ano}}</p></a>
      </div>
      <div class="result__body">
        <a [routerLink]="['/pelicula', datos.id]"><p>{{'$' + datos.precio}}</p></a>
      </div>
    </div>
  </div>
  `,
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {

  @Input({required : true}) datos !: Pelicula.PeliculaBusqueda;

  public url : string = '';

  constructor (private service : PeliculaService) {}

  ngOnInit(): void {
    this.service.getPeliculaPortada(this.datos.id).subscribe({
      next: (portada : Pelicula.PeliculaPortada) => this.url =  'pelicula/' + portada.url,
      error : () => this.url = this.url
    });  
  }
}
