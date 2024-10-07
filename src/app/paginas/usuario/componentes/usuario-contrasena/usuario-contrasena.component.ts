import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/modelos/usuario.model';

@Component({
  selector: 'usuario-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule],
  //templateUrl: './usuario-contrasena.component.html',
  template: `<div>
    <div class="section__header">
      <h1>
        Cambiar contraseña:
      </h1>
    </div>
    <form [formGroup]="campos" (ngSubmit)="enviarContrasena()">
      <div class="full-content flow-section flex-space-bewteen">
        <div class="form__el">
          <label for="viejaContrasena">Ingrese la vieja contraseña: </label>
          <input type="text" id="viejaContrasena" formControlName="viejaContrasena" class="i-form body-block">
        </div>
        <div class="form__el">
          <label for="viejaContrasenaRep">Repita la vieja contraseña: </label>
          <input type="text" id="viejaContrasenaRep" formControlName="viejaContrasenaRep" class="i-form body-block">
        </div>
      </div>
      <div class="form__el">
        <label for="nuevaContrasena">La nueva contraseña: </label>
        <input type="text" id="nuevaContrasena" formControlName="nuevaContrasena" class="i-form body-block full-content">
      </div>
      <div class="form__el">
        <input type="submit" value="Cambiar Contraseña" class="btn btn-1" [disabled]="campos.invalid">
      </div>
    </form>
  </div>`,
  styleUrl: './usuario-contrasena.component.css'
})
export class UsuarioContrasenaComponent {
  @Output() public contrasenaCambiar : EventEmitter<Usuario.UsuarioContrasena> = new EventEmitter<Usuario.UsuarioContrasena>();

  @Input({required : true}) public id !: number;

  public campos : FormGroup = this.builder.group({
    viejaContrasena : ['', Validators.required],
    viejaContrasenaRep : ['', Validators.required],
    nuevaContrasena : ['', Validators.required]
  });

  public mensaje : string = '';

  constructor(private builder : FormBuilder) {}

  public enviarContrasena() : void {
    if (this.viejaContrasena?.value != this.viejaContrasenaRep?.value) {
      this.mensaje = 'Las contrasena ingresada no es la misma.'
      return;
    }

    const data : Usuario.UsuarioContrasena = {
      id : this.id,
      contrasena : this.nuevaContrasena?.value || '',
      viejaContrasena : this.viejaContrasena?.value || ''
    }

    this.contrasenaCambiar.emit(data);
  }

  get viejaContrasena() : AbstractControl<string, string> | null {
    return this.campos.get('viejaContrasena');
  }

  get viejaContrasenaRep() : AbstractControl<string, string> | null {
    return this.campos.get('viejaContrasenaRep');
  }

  get nuevaContrasena() : AbstractControl<string, string> | null {
    return this.campos.get('nuevaContrasena')
  }
}
