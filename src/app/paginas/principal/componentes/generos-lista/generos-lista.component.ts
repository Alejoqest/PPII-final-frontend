import { Component, Input } from '@angular/core';
import { Categoria } from '../../../../core/modelos/categoria.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'generos-lista',
  standalone: true,
  imports: [RouterModule],
  //templateUrl: './generos-lista.component.html',
  template: `<div class="full-content flow-section flex-space-around">
    @if (busqueda) {
      @for (g of generos; track g.id) {
        <div [id]="g.id">
          <a [routerLink]="['/explorar']" [queryParams]="{categoriaId : g.id}" queryParamsHandling="merge"
            class="btn btn-2">
            {{g.nombre}}
          </a>
        </div>
      }
      @empty {
        <div>No hay resultados</div>
      }
    } @else {
      <div class="section__header">
        <h2>No hay resultados</h2>
      </div>
    }
    @if (error) {
      <div class="section__header">
        <h2>Hubo un error</h2>
      </div>
    }
  </div>`,
  styleUrl: './generos-lista.component.css'
})
export class GenerosListaComponent {
  @Input({required : true}) public generos !: Categoria[];
  @Input({required : true}) public busqueda !: boolean;
  @Input({required : true}) public error !: boolean;
}
