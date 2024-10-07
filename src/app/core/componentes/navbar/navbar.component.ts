import { Component, OnInit } from '@angular/core';
import { accountLinks, guestLinks, LinkInter } from '../../recursos/routerLink';
import { StorageService } from '../../servicios/storage/storage.service';
import { Usuario } from '../../modelos/usuario.model';
import { Router, RouterModule } from '@angular/router';
import { navsearchComponent } from '../search/navsearch.component';
import { Http } from '../../modelos/http.model';
import { BusEventoService } from '../../servicios/busEvento/bus-evento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, navsearchComponent, CommonModule],
  //templateUrl: './navbar.component.html',
  template : `
  <nav class="navbar">
    <div class="navbar__bar">
      <div class="navbar__el">
        <a [routerLink]="['/']" routerLinkActive="active" class="navlink">
          <h2>Pelibrary</h2>
        </a>
      </div>
      <div class="navbar_el">
        <nav-search (emitirDatos)="buscarPelicula($event)"></nav-search>
      </div>
      <div class="navbar__el">
        <a [routerLink]="['/explorar']" routerLinkActive="active" class="navlink">Explorar</a>
      </div>
      <div class="navbar__el">
        <button (click)="cambiarMenu()" class="navlink" id="menu-btn">Menu</button>
      </div>
    </div>
    <div [ngClass]="{'navbar__menu' : true, 'invisible' : !menuExtendido}">
      <ul>
      @for (link of navLinks; track $index) {
        <li><a [routerLink]="[link.link]" routerLinkActive="active" (click)="cambiarMenu()" class="navlink">{{link.nombre}}</a></li>
      }
      @if (haySesion) {
        <li><p class="navlink" (click)="cerrarSesion()">Cerrar Sesión</p></li>
      }
      </ul>
    </div>
  </nav> 
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public navLinks : LinkInter[] = [];
  public menuExtendido : boolean = false;
  public userData ?: Usuario.UsuarioResultado;
  public haySesion = false;

  constructor (private account : StorageService, private bus : BusEventoService, private router : Router) {}

  ngOnInit(): void {
    this.obtenerLinks();
    this.bus.suscribir('sesion').subscribe(() => this.obtenerLinks());
  }

  public obtenerLinks() : void {
    this.haySesion = this.account.haySesion();
    this.navLinks = (!this.haySesion)? guestLinks : accountLinks;
  }

  public buscarPelicula(data : Http.SearchQueries) : void {
    this.router.navigate(['/explorar'], {queryParams: data, queryParamsHandling: 'merge'})
  }

  public cerrarSesion() : void {
    this.account.removeToken();
    this.obtenerLinks();
    this.menuExtendido = false;
    this.router.navigate(['/'])
  }

  public cambiarMenu() : void {
    this.menuExtendido = !this.menuExtendido;
  }
}
