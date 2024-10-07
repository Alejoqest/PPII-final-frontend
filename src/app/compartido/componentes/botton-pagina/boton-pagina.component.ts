import { Component, Input } from '@angular/core';
import { BusEventoService } from '../../../core/servicios/busEvento/bus-evento.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'boton-pagina',
  standalone: true,
  imports: [],
  //templateUrl: './botton-pagina.component.html',
  template: `<div>
    @if (!paginaActual) {
      <a (click)="cambiarPagina(pagina)">
        {{pagina}}
      </a>
    } @else {
      <p>
        {{pagina}}
      </p>
    }
  </div>`,
  styleUrl: './botton-pagina.component.css'
})
export class BotonPaginaComponent {
  @Input({required : true}) public pagina !: number;
  @Input({required : true}) public paginaActual !: boolean;

  constructor(private bus : BusEventoService) {}

  public cambiarPagina(dato : number) {
    this.bus.publicar({name : 'paginaCambio', data : dato})
  }
}
