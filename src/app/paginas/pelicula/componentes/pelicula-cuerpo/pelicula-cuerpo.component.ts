import { Component, Input } from '@angular/core';
import { Pelicula } from '../../../../core/modelos/pelicula.model';
import { PortadaComponent } from '../../../../compartido/componentes/portada/portada.component';
import { PeliculaOpcionesComponent } from '../pelicula-opciones/pelicula-opciones.component';

@Component({
  selector: 'pelicula-content',
  standalone: true,
  imports: [],
  //templateUrl: './content.component.html',
  template : `
  <div>
    <div class="section__header">
      <h1>{{datos.nombre}} {{datos.formato}}</h1>
    </div>
    <div class="full-content content flow-section flex-space-between">
      <div id="contenido">
        <div>
          <p>
            <strong>Año :</strong> {{datos.ano}}
          </p>
        </div>
        <div>
          <p>
            <strong>Precio :</strong> {{'$' + datos.precio}}
          </p>
        </div>
        <div>
          <p>
            <strong>Unidades Disponibles :</strong> {{datos.stock}}
          </p>
        </div>
      </div>
      <div id="comprar">
        <ng-content/>
      </div>
    </div>
  </div>`,
  styleUrl: './content.component.css'
})
export class PeliculaCuerpoComponent {

  @Input({required : true}) public datos !: Pelicula.PeliculaDatos;

  constructor () {}

}
