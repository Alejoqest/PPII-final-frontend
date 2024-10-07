import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-formulario.component.html',
  styles: `#form {
    /*max-width: 251.55px;*/
  }`,
  //styleUrl: './login-formulario.component.css'
})
export class LoginFormularioComponent {
  @Output() public enviarInfo : EventEmitter<{email : string, contrasena : string}> = new EventEmitter<{email : string, contrasena : string}>();

  public form : FormGroup = this.builder.group({
    email : ['', [Validators.required, Validators.email]],
    contrasena : ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private builder : FormBuilder) {}

  confirmarFormulario() : void {
    const data = {
      email : this.email?.value,
      contrasena : this.contrasena?.value
    };

    this.enviarInfo.emit(data);
  }

  public confirmarError(valor : string) : boolean | undefined {
    return (this.form.get(valor)?.invalid && (this.form.get(valor)?.dirty || this.form.get(valor)?.touched));
  }

  get email() : AbstractControl<any, any> | null {
    return this.form.get('email');
  }

  get contrasena() : AbstractControl<any, any> | null {
    return this.form.get('contrasena');
  }

}
