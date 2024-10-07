import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../../core/modelos/usuario.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'usuario-dinero',
  standalone: true,
  imports: [ReactiveFormsModule],
  //templateUrl: './usuario-dinero.component.html',
  template : `<div>
    <div class="section__header">
      <h1>
        Administrar el Dinero de la cuenta
      </h1>
    </div>
    <div class="flow-section flex-center">
      <p>Dinero actual : {{'$' + info.dinero}}</p>
    </div>
    <div class="form__el">
      <label for="dinero">Realice una operacion: </label>
      <div class="body-block">
        <input type="number" id="dinero" [formControl]="campo" class="i-form" placeholder="Realizar operacion">
        <button (click)="aumentarDinero()" [disabled]="campo.invalid" class="btn btn-1">+</button>
        <button (click)="disminuirDinero()" [disabled]="campo.invalid" class="btn btn-1">-</button>
      </div>
    </div>
  </div>`,
  styleUrl: './usuario-dinero.component.css'
})
export class UsuarioDineroComponent {
  @Output() public dineroIngresar : EventEmitter<Usuario.UsuarioDinero> = new EventEmitter<Usuario.UsuarioDinero>();
  @Input({required : true}) public info !: Usuario.UsuarioDinero;
  public campo : FormControl = new FormControl([0, [Validators.required, Validators.min(1)]]);

  public aumentarDinero() : void {
    const dinero : number = this.info.dinero || 0 + this.campo.value; 
    this.enviarDinero(dinero);
  }

  public disminuirDinero() : void {
    const dinero : number = this.info.dinero || 0 - this.campo.value;
    this.enviarDinero(dinero)
  }

  private enviarDinero(dinero : number) {
    const datos : Usuario.UsuarioDinero = {
      id : this.info.id,
      dinero : dinero
    };

    this.dineroIngresar.emit(datos);
  }
}
