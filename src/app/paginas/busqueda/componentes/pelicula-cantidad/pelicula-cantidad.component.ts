import { Component, Input } from '@angular/core';
import { BotonPaginaComponent } from '../../../../compartido/componentes/botton-pagina/boton-pagina.component';

@Component({
  selector: 'pelicula-cantidad',
  standalone: true,
  imports: [BotonPaginaComponent],
  //templateUrl: './pelicula-cantidad.component.html',
  template: `<div>
    @if (busqueda && cantidad >= 1) {
      @for (p of obtenerLista(); track $index) {
        <boton-pagina [pagina]="p" [paginaActual]="(paginaActual == p)"/>
      }
    }
  </div>`,
  styleUrl: './pelicula-cantidad.component.css'
})
export class PeliculaCantidadComponent {
  @Input({required : true, transform : conseguirPagina}) public paginaActual !: number;
  @Input({required : true}) public busqueda !: boolean;
  @Input({required : true}) public cantidad !: number;
  public paginas : number = this.cantidad / 16;

  public obtenerLista() : number[] {
    let cantidadPag = 1;

    while (cantidadPag * 16 < this.cantidad) {
      cantidadPag++;
    }

    const paginas : number[] = (cantidadPag >= 1)? Array.from({length: cantidadPag}, (_, i) => i + 1) : [1] ;

    return paginas;
  }

  public esActual(pagina : number) : boolean {
    return (this.paginaActual == pagina);
  }
}

function conseguirPagina(num : string | undefined) {
  return (num !== undefined)? Number(num) : 1;
}
