import { Component, Input } from '@angular/core';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'factura-detalles',
  standalone: true,
  imports: [RouterLink],
  //templateUrl: './factura-detalles.component.html',
  template: `<div class="full-content">
    @for (detalle of detalles; track detalle.id) {
      <div class="full-content background background-1 flow-section flex-space-around">
        <div>
          <a [routerLink]="['/pelicula', detalle.peliculaId]">{{detalle.peliculaNombre}} {{detalle.peliculaFormato}}</a>
        </div>
        <div>
          <p>Unidades: {{detalle.unidades}}</p>
        </div>
        <div>
          <p>Subtotal: {{'$' + detalle.subTotal}}</p>
        </div>
      </div>
    }
  </div>`,
  styleUrl: './factura-detalles.component.css'
})
export class FacturaDetallesComponent {
  @Input({required : true}) detalles !: CarroFactura.DetallesFactura[];
  
}
