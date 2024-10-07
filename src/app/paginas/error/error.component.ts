import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  //templateUrl: './error.component.html',
  template: `<div class="section flow-section flex-center">
    <div class="section__header">Pagina no Encontrada</div>
  </div>`,
  styleUrl: './error.component.css'
})
export class ErrorComponent {
}
