import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../../core/modelos/usuario.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '../../../../compartido/componentes/dialog/dialog.component';
import { GeneralService } from '../../../../compartido/servicios/general/general.service';

const DATA_DINERO = {
  encabezado : '¿En verdad quiere realizar esta operacion?',
  cuerpo : (operacion : '+' | '-') : string => {
    return (`Confirme de que quiere ${(operacion == '+')?  'ingresar' : 'extraer'} dinero a la cuenta`);
  }
}

@Component({
  selector: 'usuario-dinero',
  standalone: true,
  imports: [ReactiveFormsModule, DialogComponent],
  //templateUrl: './usuario-dinero.component.html',
  template : `<div>
    <!--<app-dialog id="dialog-dinero-cuenta" (eventoConfirmacion)="enviarDinero()">
      <h1 ngProjectAs="dialog-header">¿En verdad quiere realizar esta operacion?</h1>
      <p ngProjectAs="dialog-body">Confirme de que quiere {{(ingresar)?  'ingresar' : 'extraer'}} dinero a la cuenta</p>
      <button ngProjectAs="dialog-accept" class="btn btn-1" (click)="enviarDinero()">{{(ingresar)? 'Ingresar' : 'Extraer'}}</button>
    </app-dialog>-->
    <div class="section__header">
      <h1>
        Administrar el Dinero de la cuenta
      </h1>
    </div>
    @if (mensaje != '') {
      <small class="error">
        {{mensaje}}
      </small>
    }
    <div class="flow-section flex-center">
      <p>Dinero actual : {{'$' + info.dinero}}</p>
    </div>
    <div class="form__el">
      <label for="dinero">Realice una operacion: </label>
      <div class="body-block">
        <input type="number" id="dinero" [formControl]="campo" class="i-form" placeholder="Realizar operacion" value="0" min="0">
        <button (click)="realizarOperacion('+')" [disabled]="campo.invalid" class="btn btn-1">+</button>
        <button (click)="realizarOperacion('-')" [disabled]="campo.invalid" class="btn btn-1">-</button>
      </div>
    </div>
  </div>`,
  styleUrl: './usuario-dinero.component.css'
})
export class UsuarioDineroComponent {
  @Output() public dineroIngresar : EventEmitter<Usuario.UsuarioDinero> = new EventEmitter<Usuario.UsuarioDinero>();
  @Input({required : true}) public info !: Usuario.UsuarioDinero;
  public ingresar : boolean = true;
  public dinero : number = 0;
  public mensaje : string = '';
  public campo : FormControl = new FormControl([0, [Validators.required, Validators.min(1)]]);
  
  constructor (public general : GeneralService) {}

  public realizarOperacion(tipo : '+' | '-') {
    const infoDinero : number = this.info.dinero || 0;
    this.dinero = (tipo == '+')? infoDinero + this.campo.value : infoDinero + this.campo.value;
    this.ingresar = (tipo == '+');
    if (!this.ingresar && this.dinero < 0) {
      this.mensaje = 'Estas extrayendo más de lo que se puede.';
      return;
    }
    this.mensaje = '';
    //this.general.abrir('dialog-dinero-cuenta')
    this.enviarDinero();
  }

  public enviarDinero() {
    this.general.cerrar('dialog-dinero-cuenta');
    const datos : Usuario.UsuarioDinero = {
      id : this.info.id,
      dinero : this.dinero
    };


    this.dineroIngresar.emit(datos);
  }
  
  get DATA_DINERO() {
    return DATA_DINERO;
  }
}
