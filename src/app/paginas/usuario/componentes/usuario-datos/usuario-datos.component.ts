import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/modelos/usuario.model';
import { GeneralService } from '../../../../compartido/servicios/general/general.service';
import { DialogComponent } from '../../../../compartido/componentes/dialog/dialog.component';

const DATA = {
  encabezado : '¿Desea realizar el cambio?',
  cuerpo : 'Esta accion no se va a poder desahacer. Todos los datos anteriores va a ser sobreescribidos.',
}

@Component({
  selector: 'usuario-datos',
  standalone: true,
  imports: [ReactiveFormsModule, DialogComponent],
  //templateUrl: './usuario-datos.component.html',
  template: `<div>
    @if (general.visible) {
      <app-dialog [encabezado]="data.encabezado" [texto]="data.cuerpo" (eventoConfirmacion)="enviarEdicion()"/>
    }
    <div class="section__header">
      <h1>Informacion de usuario:</h1>
    </div>
    <form [formGroup]="campos" (ngSubmit)="mostrar()">
      <div class="full-content flow-section flex-space-between">
        <div class="form__el">
          <label for="nombre">Nombre: </label>
          <input type="text" id="nombre" formControlName="nombre" class="i-form body-block" placeholder="Nombre">
        </div>
        <div class="form__el">
          <label for="apellido">Apellido: </label>
          <input type="text" id="apellido" formControlName="apellido" class="i-form body-block" placeholder="Apellido">
        </div>
      </div>
      <div class="form__el">
        <label for="apodo">Apodo: </label>
        <input type="text" id="apodo" formControlName="apodo" class="i-form body-block full-content" placeholder="Apodo">
      </div>
      <div class="form__el">
        <label for="email">Email: </label>
        <input type="text" id="email" formControlName="email" class="i-form body-block full-content" placeholder="Email">
      </div>
      <div class="form__el">
        <label for="telefono">Telefono: </label>
        <input type="text" id="telefono" formControlName="telefono" class="i-form body-block full-content" placeholder="Telefono">
      </div>
      <div class="form__el full-content flow-section flex-space-between">
        <button (click)="reiniciarInfo()" class="btn btn-2">Reiniciar</button>
        <input type="submit" value="Actualizar" [disabled]="campos.invalid" class="btn btn-1">
      </div>
    </form>
  </div>`,
  styleUrl: './usuario-datos.component.css'
})
export class UsuarioDatosComponent implements OnInit {
  @Output() public usuarioActualizar : EventEmitter<Usuario.UsuarioDatos> = new EventEmitter<Usuario.UsuarioDatos>();
  @Input({required : true}) public usuario !: Usuario.UsuarioDatos;

  public campos : FormGroup = this.builder.group({
    nombre : ['', Validators.required],
    apellido : ['', Validators.required],
    apodo : [''],
    email : ['', [Validators.required, Validators.email]],
    telefono : ['', [Validators.required]]
  });

  constructor(private builder : FormBuilder, public general : GeneralService) {}

  ngOnInit(): void {
    this.reiniciarInfo();
  }

  public mostrar() : void {
    this.general.visible = true;
  }

  public enviarEdicion() : void {
    this.general.visible = false;
    const datos : Usuario.UsuarioDatos = {
      id : this.usuario.id,
      nombre : this.nombre?.value,
      apellido : this.apellido?.value,
      apodo : (this.apodo?.value != '')? this.apodo?.value : (this.nombre?.value + ' ' + this.apellido?.value),
      email : this.email?.value,
      telefono : this.email?.value,
      dinero : this.usuario.dinero,
      rol : this.usuario.rol
    };
    this.usuarioActualizar.emit(datos);
  }

  public reiniciarInfo() : void {
    this.campos.patchValue({
      nombre : this.usuario.nombre,
      apellido : this.usuario.apellido,
      apodo : this.usuario.apodo,
      email: this.usuario.email,
      telefono : this.usuario.telefono
    })
  }

  get nombre() {
    return this.campos.get('nombre');
  }

  get apellido() {
    return this.campos.get('aepllido');
  }

  get apodo() {
    return this.campos.get('apodo');
  }

  get email() {
    return this.campos.get('email');
  }

  get telefono() {
    return this.campos.get('telefono');
  }
  
  get data() : any {
    return DATA;
  }
}
