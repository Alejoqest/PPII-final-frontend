import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../../core/servicios/pelicula/pelicula.service';
import { Pelicula } from '../../../core/modelos/pelicula.model';
import { ResultComponent } from '../result/result.component';
import { Http } from '../../../core/modelos/http.model';

@Component({
  selector: 'movie-search-wrapper',
  standalone: true,
  imports: [ResultComponent],
  //templateUrl: './wrapper.component.html',
  template : `
  <div class="search__wrapper background-1">
    @if (busqueda) {
        @for (resultado of resultados; track $index) {
          <pelicula-result [datos]="resultado"></pelicula-result>
        }
        @empty {
          <div class="search__process">
            <h2>{{mensaje}}</h2>
          </div>
        }
    } 
    @else {
      <div class="search__process">
        <h2>Cargando...</h2>
      </div>
    }
  </div>
  `,
  styles : `
  .search__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 1rem;
  }
  .search__process {
    text-align: center;
  }
  .search__process > h2 {
    color: var(--color-m-vh);
  }
  `
  //styleUrl: './wrapper.component.css'
})
export class WrapperComponent implements OnInit{
  @Input({required : true}) public resultados !: Pelicula.PeliculaBusqueda[];
  @Input({required : true}) public busqueda !: boolean;
  
  public mensaje : string = "No hay resultados de la busqueda";
  
  ngOnInit(): void {
    
  }

}
