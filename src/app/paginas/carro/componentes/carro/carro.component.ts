import { Component, Input, Output } from '@angular/core';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { EventEmitter } from  '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'carro-compras',
  standalone: true,
  imports: [NgClass],
  //templateUrl: './carro.component.html',
  template: `<div class="full-content background-4">
    <div class="flow-section flex-space-between full-content align-center">
      <div>
        <p>Cantidad de elementos : {{carro.cantidadDeElementos}}</p>
      </div>
      <div>
        <p>Precio total : {{carro.precioTotal}}</p>
      </div>
      <div>
        <button (click)="vaciarCarro()" class="btn btn-1" [disabled]="(carro.cantidadDeElementos == 0)">
          Vaciar Carro
        </button>
        <button (click)="cambiarVista()" class="btn btn-1">
          {{(mostrarElementos)? 'Ocultar Elementos' : 'Mostrar Elementos'}}
        </button>
      </div>
    </div>
    <div [ngClass]="{'invisible' : !mostrarElementos}" class="top-margin-m">
      <ng-content/>
    </div>
    <div class="full-content flow-section flex-end align-center top-margin-m">
      <button (click)="hacerFactura()" class="btn btn-1" [disabled]="accion">Comprar</button>
    </div>
  </div>`,
  styleUrl: './carro.component.css'
})
export class CarroComponent {
  @Input({required : true}) public carro !: CarroFactura.CarroCompras;
  @Input({required : true}) public accion !: boolean;
  @Output() public carroVaciar : EventEmitter<any> = new EventEmitter();
  @Output() public carroFactura : EventEmitter<any> = new EventEmitter();

  public mostrarElementos : boolean = true;

  public cambiarVista() {
    this.mostrarElementos = !this.mostrarElementos;
  }

  public vaciarCarro() {
    this.carroVaciar.emit('vaciar');
  }

  public hacerFactura() {
    this.carroFactura.emit('factura');
  }

}
