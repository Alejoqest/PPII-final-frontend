import { Component } from '@angular/core';
import { LoginFormularioComponent } from './componentes/login-formulario/login-formulario.component';
import { AuthService } from '../../core/servicios/auth/auth.service';
import { StorageService } from '../../core/servicios/storage/storage.service';
import { Router, RouterModule } from '@angular/router';
import { Http } from '../../core/modelos/http.model';
import { BusEventoService } from '../../core/servicios/busEvento/bus-evento.service';

@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [LoginFormularioComponent, RouterModule],
  //templateUrl: './login.page.html',
  template: `<div class="section">
    @if(mensaje != '') {
      <div class="section__header">
        <h2>ERROR = {{mensaje}}</h2>
      </div>
    }
    <div class="full-content flow-section flex-center">
      <login-formulario (enviarInfo)="iniciarSesion($event)"/>
    </div>
  </div>`, 
  styleUrl: './login.page.css'
})
export class LoginPage {

  public mensaje : string = '';

  constructor (private authSer : AuthService, private storageSer : StorageService, 
    private bus : BusEventoService, private router : Router) {}

  iniciarSesion(datos : {email : string, contrasena : string}) {
    this.authSer.login(datos).subscribe({
      next : (jwt : {token : string}) =>  {
        this.storageSer.saveToken(jwt.token);
        this.bus.publicar({name : 'sesion', data : ''})
        this.router.navigate(['/cuenta']);
      },
      error : (err : Http.Response) => this.mensaje = err.mensaje
    });
  }
}
