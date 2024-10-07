import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/modelos/usuario.model';

@Component({
  selector: 'formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-registro.component.html',
  styles: `#form {
    /*max-width: 427px;*/
  }`,
  //styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {
  @Output() public enviarInfo : EventEmitter<Usuario.UsuarioCreacion> = new EventEmitter<Usuario.UsuarioCreacion>();

  public form : FormGroup = this.builder.group({
    nombre : ['', Validators.required],
    apellido : ['', Validators.required],
    apodo : [''],
    email : ['', [Validators.required, Validators.email]],
    telefono : ['', [Validators.required]],
    contrasena : ['', [Validators.required, Validators.minLength(8)]],
    repetirContrasena : ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private builder : FormBuilder) {}

  public confimarEnvio() {
    if (this.contrasena?.value !== this.reContrasena?.value) {
      return;
    }
    const data : Usuario.UsuarioCreacion = {
      nombre : this.nombre?.value,
      apellido : this.apellido?.value,
      apodo : (this.apodo?.value) || this.getApodo(),
      email : this.email?.value,
      contrasena : this.contrasena?.value,
      telefono : this.telefono?.value,
      rol : 'CLIENTE'
    }
    console.log(data);
    this.enviarInfo.emit(data);
  }

  public confirmarError(valor : string) : boolean | undefined {
    return (this.form.get(valor)?.invalid && (this.form.get(valor)?.dirty || this.form.get(valor)?.touched));
  }

  private getApodo() : string {
    return (this.nombre?.value + ' ' + this.apellido?.value);
  }

  get nombre() {
    return this.form.get('nombre');
  }
  
  get apellido() {
    return this.form.get('apellido');
  }

  get apodo() {
    return this.form.get('apodo');
  }

  get email() {
    return this.form.get('email');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get contrasena() {
    return this.form.get('contrasena');
  }

  get reContrasena() {
    return this.form.get('repetirContrasena');
  }
}
