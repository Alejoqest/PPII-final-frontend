import { Component, Input } from '@angular/core';
import { Pelicula } from '../../../../core/modelos/pelicula.model';
import { CategorialistComponent } from '../categorialist/categorialist.component';

@Component({
  selector: 'pelicula-descripcion',
  standalone: true,
  imports: [CategorialistComponent],
  //templateUrl: './pelicula-descripcion.component.html',
  template : `<div class="full-content">
    <div>
      <pelicula-categorias [id]="pelicula.id"/>
    </div>
    <div>
      <div class="section__header">
        <h3>Resumen de la trama: </h3>
      </div>
      <div>
        <p>{{pelicula.descripcion}}</p>
      </div>
    </div>
  </div>`,
  styleUrl: './pelicula-descripcion.component.css'
})
export class PeliculaDescripcionComponent {
  @Input({required : true}) public pelicula !: Pelicula.PeliculaDatos;
}
