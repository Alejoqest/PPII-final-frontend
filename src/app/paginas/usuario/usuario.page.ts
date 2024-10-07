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

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterOutlet,
    FotoPerfilComponent, 
    UsuarioDatosComponent, 
    UsuarioContrasenaComponent, 
    UsuarioDineroComponent, 
    UsuarioEliminarComponent, 
    FacturaWrapperComponent
  ],
  //templateUrl: './usuario.page.html',
  template: `
    @if (mensaje !== '') {
      <div>
        <h2>{{mensaje}}</h2>
      </div>
    }
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
      error : (err : Http.Response) => this.mensaje = err.mensaje
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
        this.mensaje = 'Se actualizo los datos de usuario correctamente.';
        this.sesion.saveToken(jwt.token);
        this.obtenerUsuario();
      },
      error : (err : Http.Response) => this.mensaje = err.mensaje
    });
  }

  public actualizarContrasena(datos : Usuario.UsuarioContrasena) {
    this.service.putContrasena(datos).subscribe({
      next : (jwt) => {
        this.mensaje = 'Se cambio la contraseña correctamente.';
        this.sesion.saveToken(jwt.token);
        this.obtenerUsuario();
      },
      error : (err : Http.Response) => this.mensaje = err.mensaje
    });
  }

  public ingresarDinero(datos : Usuario.UsuarioDinero) {
    this.service.putDinero(datos).subscribe({
      next : (val : Usuario.UsuarioDatos) => {
        this.usuario = val;
        this.mensaje = 'Se cambio actualizo el dinero.'
      },
      error : (err : Http.Response) => this.mensaje = err.mensaje
    });
  }

  public actualizarFoto(imagen : File) {
    const data : FormData = new FormData();

    data.append('imagen', imagen);

    this.service.putFoto(data).subscribe({
      next : (val : Usuario.UsuarioFoto) => this.usuarioFoto = val
    })
  }

  public eliminarCuenta() {
    this.service.deleteUsuario().subscribe({
      next : () => {
        this.sesion.removeToken();
        this.router.navigate(['/login']);
      },
      error : (err : Http.Response) => this.mensaje = err.mensaje
    });
  }
}
