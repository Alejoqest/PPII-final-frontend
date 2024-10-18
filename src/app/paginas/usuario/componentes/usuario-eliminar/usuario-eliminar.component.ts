import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralService } from '../../../../compartido/servicios/general/general.service';
import { DialogComponent } from '../../../../compartido/componentes/dialog/dialog.component';

const DATA_DELETE = {
  encabezado : '¿Desea eliminar su cuenta?',
  cuerpo : 'No podra desahacer esta accion.'
}

@Component({
  selector: 'usuario-eliminar',
  standalone: true,
  imports: [DialogComponent],
  //templateUrl: './usuario-eliminar.component.html',
  template: `<div>
    <app-dialog id="dialog-borrar-cuenta" (eventoConfirmacion)="confimarEliminacion()">
      <h1 ngProjectAs="dialog-header">¿Desea eliminar su cuenta?</h1>
      <p ngProjectAs="dialog-body">No podra desahacer esta accion. Sus datos se van perden para siempre</p>
      <button ngProjectAs="dialog-accept" class="btn btn-1" (click)="confimarEliminacion()">Eliminar</button>
    </app-dialog>
    <div class="section__header">
      <h1>Eliminar cuenta</h1>
    </div>
    <button (click)="mostrar()" class="btn btn-2">Eliminar Cuenta</button>
  </div>`,
  styleUrl: './usuario-eliminar.component.css'
})
export class UsuarioEliminarComponent {
  @Output() public usuarioEliminar : EventEmitter<any> = new EventEmitter<any>();

  constructor(public general : GeneralService) {}

  public mostrar() {
    this.general.abrir('dialog-borrar-cuenta');
  }

  public confimarEliminacion() {
    this.usuarioEliminar.emit();
  }

  get dialog() {
    //console.log(DATA_DELETE);
    return DATA_DELETE;
  }
}
