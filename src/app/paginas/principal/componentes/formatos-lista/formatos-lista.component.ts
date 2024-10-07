import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'formatos-lista',
  standalone: true,
  imports: [RouterModule],
  //templateUrl: './formatos-lista.component.html',
  template: `<div id="wrapper" class="full-content flow-section flex-space-around">
    @for (f of formatos; track $index) {
        <div>
          <a [routerLink]="['/explorar']" [queryParams]="{formato : f}" queryParamsHandling="merge"
            class="btn btn-4">
            {{f}}
          </a>
        </div>
      }
  </div>`,
  styles: `#wrapper {
    padding : 2rem;
  }`,
  //styleUrl: './formatos-lista.component.css'
})
export class FormatosListaComponent {
  @Input({required : true}) formatos !: string[];
}
