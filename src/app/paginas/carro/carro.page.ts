import { Component, OnInit } from '@angular/core';
import { CarroFacturaService } from '../../core/servicios/carrofactura/carrofactura.service';
import { CarroFactura } from '../../core/modelos/carrofactura.model';
import { Http } from '../../core/modelos/http.model';
import { CarroComponent } from './componentes/carro/carro.component';
import { ElementosComponent } from './componentes/carroElementos/carro-elementos.component';
import { MensajeComponent } from '../../core/componentes/mensaje/mensaje.component';

@Component({
  selector: 'carro-pagina',
  standalone: true,
  imports: [CarroComponent, MensajeComponent, ElementosComponent],
  //templateUrl: './carro.component.html',
  template: `<div class="section">
    <app-mensaje [mensaje]="mensaje" [hayError]="error"/>
    <div class="section__header">
      <h1>
        Carro compras
      </h1>
    </div>
    <div>
      @if (carro) {
        <carro-compras [carro]="carro" [accion]="accion" (carroFactura)="crearFactura()" (carroVaciar)="vaciarCarro()" class="full-content">
          <carro-elementos [elementos]="elementos" (carroModificar)="actualizarElemento($event)" class="full-content"/>
        </carro-compras>
      } @else {
        <div class="full-content">
          <div class="section__header">
            <h2>
              Cargando...
            </h2>
          </div>
        </div>
      }
    </div>
  </div>`,
  styleUrl: './carro.page.css'
})
export class CarroPage implements OnInit {
  public carro ?: CarroFactura.CarroCompras;
  public accion : boolean = false;
  public elementos : CarroFactura.CarroElemento[] = [];
  public error : boolean = false;
  public mensaje : string = '';

  constructor(private mainService : CarroFacturaService) {}

  ngOnInit(): void {
    this.cargarCarro();
    this.cargarDetalles();
  }

  public cargarCarro() : void {
    this.mainService.getCarro().subscribe({
      next : (value : CarroFactura.CarroCompras) => this.carro = value,
      error : (err) => {
        this.error = true;
        this.mensaje = err.error.mensaje;
      }
    });
  }

  public cargarDetalles() : void {
    this.mainService.getCarroElementos().subscribe({
      next : (val : CarroFactura.CarroElemento[]) => this.elementos = val,
    });
  }

  public actualizarElemento(elemento : CarroFactura.CarroElemento) : void {
    this.accion = true;
    this.mainService.putCarroElemento(elemento).subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.gestionarRespuesta();
      },
      error : (err) =>  this.gestionarError(err)
    })
  }

  public vaciarCarro() : void {
    this.accion = true;
    this.mainService.putCarroVacio().subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.gestionarRespuesta();
      },
      error : (err) =>  this.gestionarError(err)
    })
  }

  public crearFactura() : void {
    this.accion = true;
    this.mainService.postFacturaCarro().subscribe({
      next : (val : CarroFactura.CarroCompras) => {
        this.carro = val;
        this.gestionarRespuesta();
      },
      error : (err) => this.gestionarError(err)
    })
  }

  private gestionarError(err : any) {
    const error : Http.Response = err.error;
    this.accion = false;
    this.error = true;
    this.mensaje = error.mensaje;
  }

  private gestionarRespuesta() {
    this.accion = false;
    this.error = false;
    this.mensaje = '';
    this.cargarDetalles();
  }
}
