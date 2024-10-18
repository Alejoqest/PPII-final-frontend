import { Component } from '@angular/core';
import { LoginFormularioComponent } from './componentes/login-formulario/login-formulario.component';
import { AuthService } from '../../core/servicios/auth/auth.service';
import { StorageService } from '../../core/servicios/storage/storage.service';
import { Router, RouterModule } from '@angular/router';
import { Http } from '../../core/modelos/http.model';
import { BusEventoService } from '../../core/servicios/busEvento/bus-evento.service';
import { MensajeComponent } from '../../core/componentes/mensaje/mensaje.component';

@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [LoginFormularioComponent, MensajeComponent, RouterModule],
  //templateUrl: './login.page.html',
  template: `<div class="section">
    <app-mensaje [mensaje]="mensaje" [hayError]="error"/>
    <div class="full-content flow-section flex-center">
      <login-formulario (enviarInfo)="iniciarSesion($event)"/>
    </div>
  </div>`, 
  styleUrl: './login.page.css'
})
export class LoginPage {
  public mensaje : string = '';
  public error : boolean = false;
  public enviando = false;

  constructor (private authSer : AuthService, private storageSer : StorageService, 
    private bus : BusEventoService, private router : Router) {}

  iniciarSesion(datos : {email : string, contrasena : string}) {
    this.authSer.login(datos).subscribe({
      next : (jwt : {token : string}) =>  {
        this.storageSer.saveToken(jwt.token);
        this.bus.publicar({name : 'sesion', data : ''})
        this.router.navigate(['/cuenta']);
      },
      error : (err) => {
        const errores = err.error;
        this.mensaje = errores.mensaje;
        this.error = true;
      }
    });
  }
}
