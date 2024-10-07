import { Component, Input } from '@angular/core';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { CarroFacturaService } from '../../../../core/servicios/carrofactura/carrofactura.service';
import { FacturaDetallesComponent } from '../factura-detalles/factura-detalles.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'factura',
  standalone: true,
  imports: [FacturaDetallesComponent, NgClass],
  //templateUrl: './factura.component.html',
  template: `<div class="full-content background backgorund-2">
    <div class="full-content flow-section flex-space-between">
      <div>
        Cantidad de Elementos: {{factura.cantidadDeElementos}}
      </div>
      <div>
        Fecha: {{factura.fechaFactura}}
      </div>
      <div>
        Total: {{factura.precioTotal}}
      </div>
      <div>
        @if (!detalles) {
          <button (click)="cargarDetalles()" [disabled]="detallesCargados" class="btn btn-3">Ver detalles</button>
        } @else {
          <button (click)="cambiarVisibilidad()" class="btn btn-3">{{(detallesVista)? 'Ocultar detalles' : 'Mostrar detalles'}}</button>
        }
      </div>
    </div>
    @if (detalles) {
      <div class="full-content" [ngClass]="{'invisible' : !detallesVista, 'detalles-list' : detallesCargados}">
        <factura-detalles [detalles]="detalles" class="full-content"/>
      </div>
    }
  </div>`,
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  @Input({required : true}) public factura !: CarroFactura.Factura;
  public detalles ?: CarroFactura.DetallesFactura[];
  public detallesCargados : boolean = false;
  public detallesVista : boolean = false;

  constructor(private service : CarroFacturaService) {}

  public cargarDetalles() : void {
    this.detallesCargados = !this.detallesCargados;
    this.service.getFacturasDetalles(this.factura.id).subscribe({
      next : (value : CarroFactura.DetallesFactura[]) => {
        this.detalles = value;
        this.detallesVista = !this.detallesVista;
      }
    })
  }

  public cambiarVisibilidad() : void {
    this.detallesVista = !this.detallesVista;
  }
}
