import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Usuario } from './core/modelos/usuario.model';
import { guestLinks} from './core/recursos/routerLink';
import { NavbarComponent } from './core/componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : []
})
export class AppComponent {
  usuario : Usuario.UsuarioResultado = {
    id : 0,
    apodo : 'cliente',
    email : 'sin email',
    rol : 'ADMIN'
  };

  guestsLink = guestLinks;
}
