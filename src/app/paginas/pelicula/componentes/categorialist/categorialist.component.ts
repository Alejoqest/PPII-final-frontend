import { Component, Input, OnInit } from '@angular/core';
import { PeliculaService } from '../../../../core/servicios/pelicula/pelicula.service';
import { Categoria } from '../../../../core/modelos/categoria.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pelicula-categorias',
  standalone: true,
  imports: [RouterLink],
  //templateUrl: './categorialist.component.html',
  template : `<div>
    <div class="section__header">
      <h3>Generos: </h3>
    </div>
    @for (ele of lista; track ele.id) {
      <div class="lista__elemento">
        <a [routerLink]="['/explorar']" [queryParams]="{categoriaId : id}">
          <p>{{ele.nombre}}</p>
        </a>
      </div>
    } @empty {
      <p>Sin generos</p>
    }
  </div>`,
  styleUrl: './categorialist.component.css'
})
export class CategorialistComponent implements OnInit {
  @Input({required : true}) public id !: number;

  public lista : Categoria[] = [];

  constructor (private service : PeliculaService) {}

  ngOnInit(): void {
    this.service.getPeliculaCategorias(this.id).subscribe({
      next : (value : Categoria[]) => this.lista = value
    })
  }


}
