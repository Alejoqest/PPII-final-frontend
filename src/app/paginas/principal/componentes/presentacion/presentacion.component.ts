import { Component } from '@angular/core';

@Component({
  selector: 'presentacion',
  standalone: true,
  imports: [],
  //templateUrl: './presentacion.component.html',
  template: `<div id="wrapper" class="section flow-section flex-center">
    <div id="body">
      <div id="header">
        <h1>Bienvenido!</h1>
      </div>
    </div>
  </div>`,
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {

}
