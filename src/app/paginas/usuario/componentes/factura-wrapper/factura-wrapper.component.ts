import { Component, OnInit } from '@angular/core';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { CarroFacturaService } from '../../../../core/servicios/carrofactura/carrofactura.service';
import { FacturaComponent } from '../factura/factura.component';

@Component({
  selector: 'factura-wrapper',
  standalone: true,
  imports: [FacturaComponent],
  //templateUrl: './factura-wrapper.component.html',
  template: `
  <div>
    <div class="section__header">
      <h1>Facturas</h1>
    </div>
    @if (hayFacturas) {
      <div class="background background-1">
        @for (f of facturas; track f.id) {
          <factura [factura]="f" class="full-content"/>
        } @empty {
          <div class="full-content">
            <div class="section__header">
              <h2>No hay facturas</h2>
            </div>
          </div>
        }
      </div>
    } @else {
      <div class="section__header">
        Cargardo...
      </div>
    }
  </div>`,
  styleUrl: './factura-wrapper.component.css'
})
export class FacturaWrapperComponent implements OnInit {
  public facturas : CarroFactura.Factura[] = [];
  public hayFacturas : boolean = false;
  
  constructor(private service : CarroFacturaService) {}

  ngOnInit(): void {
    this.service.getFacturas(1).subscribe({
      next: (value : CarroFactura.Factura[]) => {
        this.facturas = value;
        this.hayFacturas = true;
      }
    })
  }
}
