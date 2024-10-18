import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/servicios/auth/auth.service';
import { Usuario } from '../../core/modelos/usuario.model';
import { StorageService } from '../../core/servicios/storage/storage.service';
import { UsuarioDatosComponent } from "./componentes/usuario-datos/usuario-datos.component";
import { UsuarioDineroComponent } from './componentes/usuario-dinero/usuario-dinero.component';
import { UsuarioContrasenaComponent } from './componentes/usuario-contrasena/usuario-contrasena.component';
import { FacturaWrapperComponent } from './componentes/factura-wrapper/factura-wrapper.component';
import { Http } from '../../core/modelos/http.model';
import { FotoPerfilComponent } from './componentes/foto-perfil/foto-perfil.component';
import { UsuarioEliminarComponent } from './componentes/usuario-eliminar/usuario-eliminar.component';
import { Router, RouterOutlet } from '@angular/router';
import { MensajeComponent } from '../../core/componentes/mensaje/mensaje.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterOutlet,
    MensajeComponent,
    FotoPerfilComponent, 
    UsuarioDatosComponent, 
    UsuarioContrasenaComponent, 
    UsuarioDineroComponent, 
    UsuarioEliminarComponent, 
    FacturaWrapperComponent
  ],
  //templateUrl: './usuario.page.html',
  template: `
  <app-mensaje [mensaje]="mensaje" [hayError]="error"/>
    @if (!haySesion) {
      <div class="section flow-content flex-center">
        <div class="section__header">
          <h2>No tienes permiso para estar aqui.</h2>
        </div>
      </div>
    }
    @if (usuario) {
      <div class="section grid-section grid-two-columns-auto">
        <foto-perfil [data]="usuarioFoto" (mandarImagen)="actualizarFoto($event)"/>
        <div class="flow-content">
          <usuario-datos [usuario]="usuario" (usuarioActualizar)="actualizarUsuario($event)"/>
          <hr>
          <usuario-contrasena [id]="usuario.id" (contrasenaCambiar)="actualizarContrasena($event)"/>
          <hr>
          <usuario-dinero [info]="{id : usuario.id, dinero : usuario.dinero}" (dineroIngresar)="ingresarDinero($event)"/>
          <hr>
          <factura-wrapper/>
          <hr>
          <usuario-eliminar (usuarioEliminar)="eliminarCuenta()"/>
        </div>
      </div>
    } @else {
      <div class="section flow-content flex-center">
        <div class="section__header">
          <h3>Cargardo...</h3>
        </div>
      </div>
    }
  `,
  styleUrl: './usuario.page.css'
})
export class UsuarioPage implements OnInit {
  public usuario ?: Usuario.UsuarioDatos;
  public usuarioFoto : Usuario.UsuarioFoto = {
    id : 0,
    nombreArchivo : '0.jpg'
  };
  public haySesion : boolean = true;
  public mensaje : string = '';
  public error : boolean = false;

  constructor(private service : AuthService, private sesion : StorageService, private router : Router) {}

  ngOnInit(): void {
    this.haySesion = this.sesion.haySesion();
    if (this.haySesion) {
      this.obtenerUsuario();
      this.obtenerFoto();
    }
  }

  public obtenerUsuario() {
    this.service.getInfoDetalles().subscribe({
      next : (value : Usuario.UsuarioDatos) => this.usuario = value,
      error : (err) => this.mensaje = err.error.mensaje
    });
  }

  public obtenerFoto() {
    this.service.getFoto().subscribe({
      next : (val : Usuario.UsuarioFoto) => this.usuarioFoto = val
    })
  }

  public actualizarUsuario(datos : Usuario.UsuarioDatos) {
    this.service.putUsuario(datos).subscribe({
      next : (jwt) => {
        this.sesion.saveToken(jwt.token);
        this.obtenerUsuario();
        this.error = false;
        this.mensaje = 'Se actualizo los datos de usuario correctamente.';
      },
      error : (err) => this.gestionarError(err)
    });
  }

  public actualizarContrasena(datos : Usuario.UsuarioContrasena) {
    this.service.putContrasena(datos).subscribe({
      next : (jwt) => {
        this.sesion.saveToken(jwt.token);
        this.obtenerUsuario();
        this.error = false;
        this.mensaje = 'Se cambio la contraseña correctamente.';
      },
      error : (err) => this.gestionarError(err)
    });
  }

  public ingresarDinero(datos : Usuario.UsuarioDinero) {
    this.service.putDinero(datos).subscribe({
      next : (val : Usuario.UsuarioDatos) => {
        this.mensaje = 'Se cambio actualizo el dinero.'
        this.error = false;
        this.usuario = val;
      },
      error : (err) => this.gestionarError(err)
    });
  }

  public actualizarFoto(imagen : File) {
    const data : FormData = new FormData();

    data.append('imagen', imagen);

    this.service.putFoto(data).subscribe({
      next : (val : Usuario.UsuarioFoto) => {
        this.usuarioFoto = val;
        this.error = false;
        this.mensaje = 'Se actualizo la foto de perfil.';
      },
      error : (err) => this.gestionarError(err)
    })
  }

  public eliminarCuenta() {
    this.service.deleteUsuario().subscribe({
      next : () => {
        this.sesion.removeToken();
        this.error = false;
        this.router.navigate(['/login']);
      },
      error : (err) => this.gestionarError(err)
    });
  }

  private gestionarError(err : any) {
    const errores = err.error;
    this.mensaje = errores.mensaje;
    this.error = true;
  }
}
