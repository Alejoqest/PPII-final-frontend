import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'carro-elementos',
  standalone: true,
  imports: [RouterLink],
  //templateUrl: './detalles.component.html',
  template: `<div class="full-content">
    @for (e of elementos; track e.id) {
      <div class="backrgound background-1 full-content flow-section flex-space-between">
        <div>
          <a [routerLink]="['/pelicula', e.peliculaId]">{{e.peliculaNombre}} [{{e.peliculaFormato}}]</a>
        </div>
        <div>
          <p>Unidades : {{e.unidades}}</p> 
        </div>
        <div>
          <p>Subtotal : {{'$' + e.subTotal}}</p>
        </div>
        <div>
          <button (click)="modificarElemento(e, '-')" class="btn btn-1">-</button>
          <button (click)="modificarElemento(e, '+')" class="btn btn-1">+</button>
        </div>
      </div>
    } @empty {
      <div class="background background-1 full-content">
        <div class="section__header">
          <h2>No hay elementos en el carro</h2>
        </div>
      </div>
    }
  </div>`,
  styleUrl: './detalles.component.css'
})
export class ElementosComponent {
  @Input({required : true}) public elementos !: CarroFactura.CarroElemento[];

  @Output() public carroModificar : EventEmitter<CarroFactura.CarroElemento> = new EventEmitter<CarroFactura.CarroElemento>();

  public modificarElemento(elemento : CarroFactura.CarroElemento, operacion : '+' | '-') {
    const precioUnitario = elemento.subTotal / elemento.unidades;
    const unidades = (operacion == '+')? elemento.unidades + 1 : elemento.unidades - 1;
    const subTotal = unidades * precioUnitario;
    elemento = {
      ... elemento,
      unidades : unidades,
      subTotal : subTotal
    }
    this.carroModificar.emit(elemento);
  }
}
