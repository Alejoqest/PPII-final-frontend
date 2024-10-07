import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { Observable } from 'rxjs';

interface Jwt {
  token : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url : string = 'http://localhost:8080/auth/';

  constructor(private http : HttpClient) { }

  public registrarse(usuario : Usuario.UsuarioCreacion) : Observable<Jwt> {
    return this.http.post<Jwt>(this.url + `register`, usuario);
  }

  public login(usuario : {email : string, contrasena : string}) : Observable<Jwt> {
    return this.http.post<Jwt>(this.url + `login`, usuario);
  }

  public logout() {
    return this.http.get(this.url + 'logout');
  }

  public getInfo() : Observable<Usuario.UsuarioResultado> {
    return this.http.get<Usuario.UsuarioResultado>(this.url + 'cuenta');
  }

  public getInfoDetalles() : Observable<Usuario.UsuarioDatos> {
    return this.http.get<Usuario.UsuarioDatos>(this.url + 'cuenta/detalles')
  }

  public getFoto() : Observable<Usuario.UsuarioFoto> {
    return this.http.get<Usuario.UsuarioFoto>(this.url + 'cuenta/foto')
  }

  public putUsuario(data : Usuario.UsuarioDatos) : Observable<Jwt> {
    return this.http.put<Jwt>(this.url + 'cuenta/actualizar', data);
  }

  public putContrasena(data : Usuario.UsuarioContrasena) : Observable<Jwt> {
    return this.http.put<Jwt>(this.url + 'cuenta/contraseña', data);
  }

  public putDinero(data : Usuario.UsuarioDinero) : Observable<Usuario.UsuarioDatos> {
    return this.http.put<Usuario.UsuarioDatos>(this.url + 'cuenta/dinero', data);
  }

  public putFoto(data : FormData) : Observable<Usuario.UsuarioFoto> {
    return this.http.put<Usuario.UsuarioFoto>(this.url + 'cuenta/foto', data)
  }

  public deleteUsuario() {
    return this.http.delete<null>(this.url + 'cuenta/eliminar');
  }
}
