import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [NgClass],
  //templateUrl: './mensaje.component.html',
  template: `
  @if (mensaje != '') {
    <div class="section message" [ngClass]="{'error' : hayError, 'no-error' : !hayError }">
      <h1>
        {{mensaje}}
      </h1>
    </div>
  }
  `,
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  @Input({required : true}) public mensaje !: string;
  @Input({required : true}) public hayError !: boolean;
}
