import { Component } from '@angular/core';
import { AuthService } from '../../core/servicios/auth/auth.service';
import { Usuario } from '../../core/modelos/usuario.model';
import { Http } from '../../core/modelos/http.model';
import { StorageService } from '../../core/servicios/storage/storage.service';
import { Router, RouterModule } from '@angular/router';
import { FormularioRegistroComponent } from './componentes/formulario-registro/formulario-registro.component';
import { BusEventoService } from '../../core/servicios/busEvento/bus-evento.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, FormularioRegistroComponent],
  //templateUrl: './registrar.page.html',
  template:`
  <div class="section">
    @if (mensaje != '') {
      <div class="section__header">
        <h2>Error = {{mensaje}}</h2>
      </div> 
    }
    <div class="full-content flow-section flex-center">
      <formulario-registro (enviarInfo)="registrarse($event)"/>
    </div>
  </div>
  `,
  styleUrl: './registrar.page.css'
})
export class RegistrarPage {
  public mensaje : string = '';

  constructor(private service : AuthService, private storage : StorageService, 
    private bus : BusEventoService, private router : Router) {}

  registrarse(datos : Usuario.UsuarioCreacion) {
    this.service.registrarse(datos).subscribe({
      next : (jwt : {token : string}) =>  {
        this.storage.saveToken(jwt.token);
        this.bus.publicar({name : 'sesion', data : ''})
        this.router.navigate(['/cuenta']);
      },
      error : (err : Http.Response) => {
        this.mensaje = err.mensaje
      }
    });
  }
}
