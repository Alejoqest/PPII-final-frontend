import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'presentacion',
  standalone: true,
  imports: [RouterLink],
  //templateUrl: './presentacion.component.html',
  template: `<div id="wrapper" class="section flow-section flex-center">
    <div id="body">
      <div id="header">
        <h1>Bienvenido!</h1>
      </div>
      <div id="content">
        <p>
          Bienvenido a pelibry! <br>
          Donde puedes encontrar todas peliculas que quieres a precio ideal
        </p>
      </div>
      <div id="btn">
        <a [routerLink]="['/registrar']" class="btn btn-1">Unete a la comunidad</a>
      </div>
    </div>
  </div>`,
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {

}
