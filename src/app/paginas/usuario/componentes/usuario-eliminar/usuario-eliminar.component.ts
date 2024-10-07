import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralService } from '../../../../compartido/servicios/general/general.service';
import { DialogComponent } from '../../../../compartido/componentes/dialog/dialog.component';

const DATA = {
  encabezado : '¿Desea eliminar su cuenta?',
  cuerpo : 'No podra desahacer esta accion.'
}

@Component({
  selector: 'usuario-eliminar',
  standalone: true,
  imports: [DialogComponent],
  //templateUrl: './usuario-eliminar.component.html',
  template: `<div>
    @if (general.visible) {
      <app-dialog [encabezado]="dialog.encabezado" [texto]="dialog.cuerpo" (eventoConfirmacion)="confimarEliminacion()"/>
    }
    <div class="section__header">
      <h2>Eliminar cuenta</h2>
    </div>
    <button (click)="mostrar()" class="btn btn-2">Eliminar Cuenta</button>
  </div>`,
  styleUrl: './usuario-eliminar.component.css'
})
export class UsuarioEliminarComponent {
  @Output() public usuarioEliminar : EventEmitter<any> = new EventEmitter<any>();

  constructor(public general : GeneralService) {}

  public mostrar() {
    this.general.visible = true;
  }

  public confimarEliminacion() {
    this.general.visible = false;
    this.usuarioEliminar.emit();
  }

  get dialog() {
    return DATA;
  }
}
