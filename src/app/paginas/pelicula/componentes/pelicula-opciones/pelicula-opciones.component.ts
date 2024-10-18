import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../../../core/modelos/pelicula.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarroFactura } from '../../../../core/modelos/carrofactura.model';
import { StorageService } from '../../../../core/servicios/storage/storage.service';

const DATA = {
  mensaje : 'Necesitas estar en sesion para realizar esa accion.'
}
@Component({
  selector: 'pelicula-opciones',
  standalone: true,
  imports: [ReactiveFormsModule],
  //templateUrl: './pelicula-opciones.component.html',
  template: `<div>
    @if (mensaje != '') {
      <small class="error">
        {{mensaje}}
      </small>
    }
    <div>
      <input type="number" [formControl]="number" (change)="cambiarPrecio()" [min]="0" [max]="info.stock" class="i-form body-block" placerholder="Ingrese las unidades">
      <button (click)="guardarCarroElemento()" [disabled]="accion" class="btn btn-1">Agregar al carro</button>
      <button (click)="guardarFactura()" [disabled]="accion" class="btn btn-1">Comprar</button>
    </div>
    <div>
      <p>Precio Total: {{precioTotal}}</p>
    </div>
  </div>`,
  styleUrl: './pelicula-opciones.component.css'
})
export class PeliculaOpcionesComponent {
  @Output() public facturaSubir : EventEmitter<CarroFactura.FacturaIntento> = new EventEmitter<CarroFactura.FacturaIntento>();
  @Output() public elementoSubir : EventEmitter<CarroFactura.CarroElemento> = new EventEmitter<CarroFactura.CarroElemento>();
  @Input({required : true}) public info !: Pelicula.PeliculaDatos;
  @Input({required : true}) public accion !: boolean;
  public precioTotal : number = 0;
  public mensaje : string = '';

  public number : FormControl = new FormControl([0, [
    Validators.required,
    Validators.min(1)
  ]]);

  constructor(private sesion : StorageService) {}

  public guardarFactura() {
    if (!this.revisarCuenta() && !this.revisarCuenta()) return;
    const datos : CarroFactura.FacturaIntento = {
      precioTotal : this.precioTotal,
      detalles : [{
        pelicula : {
          id : this.info.id
        },
        unidades : this.number.value,
        subTotal : this.precioTotal
      }]
    };
    this.facturaSubir.emit(datos);
  }

  public guardarCarroElemento() {
    if (!this.revisarCuenta() && !this.revisarCuenta()) return;
    const datos : CarroFactura.CarroElemento = {
      peliculaId : this.info.id,
      peliculaNombre : this.info.nombre,
      peliculaFormato : this.info.formato,
      unidades : this.number.value,
      subTotal : this.precioTotal
    }
    this.elementoSubir.emit(datos);
  }

  public cambiarPrecio() {
    this.precioTotal =  this.info.precio * this.number.value;
  }

  private revisarNumero() : boolean {
    const valido = (this.number.valid)
    this.mensaje = (!valido)? 'Necesita ingresar unidades.' : '';
    return valido;
  }

  public revisarCuenta() : boolean {
    const cuenta = this.sesion.haySesion();
    this.mensaje = (!cuenta)? DATA.mensaje : '';
    return cuenta;
  }
  
}
