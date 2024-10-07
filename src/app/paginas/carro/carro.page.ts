import { Component, OnInit } from '@angular/core';
import { CarroFacturaService } from '../../core/servicios/carrofactura/carrofactura.service';
import { CarroFactura } from '../../core/modelos/carrofactura.model';
import { Http } from '../../core/modelos/http.model';
import { CarroComponent } from './componentes/carro/carro.component';
import { ElementosComponent } from './componentes/carroElementos/carro-elementos.component';

@Component({
  selector: 'carro-pagina',
  standalone: true,
  imports: [CarroComponent, ElementosComponent],
  //templateUrl: './carro.component.html',
  template: `<div class="section">
    <div class="section__header">
      <h2>
        Carro compras
      </h2>
    </div>
    <div>
      @if (carro) {
        <carro-compras [carro]="carro" (carroFactura)="crearFactura()" (carroVaciar)="vaciarCarro()" class="full-content">
          <carro-elementos [elementos]="elementos" (carroModificar)="actualizarElemento($event)" class="full-content"/>
        </carro-compras>
      } @else {
        <div class="full-content">
          <div class="section__header">
            Cargando...
          </div>
        </div>
      }
    </div>
  </div>`,
  styleUrl: './carro.page.css'
})
export class CarroPage implements OnInit {
  public carro ?: CarroFactura.CarroCompras;
  public elementos : CarroFactura.CarroElemento[] = [];
  public err : boolean = false;
  public mensaje : string = '';

  constructor(private mainService : CarroFacturaService) {}

  ngOnInit(): void {
    this.cargarCarro();
    this.cargarDetalles();
  }

  public cargarCarro() : void {
    this.mainService.getCarro().subscribe({
      next : (value : CarroFactura.CarroCompras) => this.carro = value,
      error : (er : Http.Response) => {
        this.err = true;
        this.mensaje = er.mensaje;
      }
    });
  }

  public cargarDetalles() : void {
    this.mainService.getCarroElementos().subscribe({
      next : (val : CarroFactura.CarroElemento[]) => this.elementos = val,
    });
  }

  public actualizarElemento(elemento : CarroFactura.CarroElemento) : void {
    this.mainService.putCarroElemento(elemento).subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.cargarDetalles();
      }
    })
  }

  public vaciarCarro() : void {
    this.mainService.putCarroVacio().subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.cargarDetalles();
      }
    })
  }

  public crearFactura() : void {
    this.mainService.postFacturaCarro().subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.cargarDetalles();
      },
      error : (er : Http.Response) => this.mensaje = er.mensaje
    })
  }
}
