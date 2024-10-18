import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../servicios/general/general.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgClass],
  //templateUrl: './dialog.component.html',
  template: `<div [ngClass]="{'close-dialog' : !esVisible, 'open-dialog': esVisible}">
    <div id="fondo" (click)="cerrar()"></div>
    <div id="dialog" class="fit-content round-border">
      <div id="encabezado" class="section__header">
        <ng-content select="dialog-header"></ng-content>
      </div>
      <div id="cuerpo">
        <ng-content select="dialog-body"></ng-content>
      </div>
      <div id="opciones" class="full-content flow-content">
        <ng-content select="dialog-accept"></ng-content>
        <button class="btn btn-3" (click)="cerrar()">Cancelar</button>
        <!--<button class="btn btn-1" (click)="confirmacion()">Aceptar</button>
        <button class="btn btn-3" (click)="cerrar()">Cancelar</button>-->
      </div>
    </div>
  </div>`,
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input({required : true}) public id !: string;
  //@Input({required : true}) public encabezado !: string;
  //@Input({required : true}) public texto !: string;
  @Output() public eventoConfirmacion : EventEmitter<any> = new EventEmitter<any>();
  public esVisible : boolean = false;

  constructor(public general : GeneralService) {}

  ngOnInit(): void {
    this.general.anadir(this);
  }

  ngOnDestroy(): void {
    this.general.sacar(this);
  }
  
  public confirmacion() : void {
    this.eventoConfirmacion.emit();
    this.cerrar();
  }

  public abrir() {
    this.esVisible = true;
  }

  public cerrar() : void {
    this.esVisible = false;
  }

}
