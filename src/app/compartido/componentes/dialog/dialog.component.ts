import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralService } from '../../servicios/general/general.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  //templateUrl: './dialog.component.html',
  template: `<div id="fondo" (click)="salir()"></div>
  <div id="dialog" class="fit-content round-border">
    <div id="encabezado" class="section__header">
      <h2>{{encabezado}}</h2>
    </div>
    <div id="cuerpo">
      <p>{{texto}}</p>
    </div>
    <div id="opciones" class="full-content flow-content">
      <button class="btn btn-1" (click)="confirmacion()">Aceptar</button>
      <button class="btn btn-3" (click)="salir()">Cancelar</button>
    </div>
  </div>`,
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input({required : true}) public encabezado !: string;
  @Input({required : true}) public texto !: string;
  @Output() public eventoConfirmacion : EventEmitter<any> = new EventEmitter<any>();

  constructor(public general : GeneralService) {}
  
  public confirmacion() : void {
    this.eventoConfirmacion.emit();
  }

  public salir() : void {
    this.general.visible = false;
  }
}
