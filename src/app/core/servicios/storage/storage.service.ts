import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';

const USER_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public limpiar() {
    window.sessionStorage.clear();
  }

  public haySesion() : boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveToken(token : string) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token);
  }

  public getToken() {
    return window.sessionStorage.getItem(USER_KEY)
  }
  
  public removeToken() {
    window.sessionStorage.removeItem(USER_KEY);
  }
}