import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneratorComponent } from "../../compartido/componentes/generator/generator.component";
import { Pelicula } from '../../core/modelos/pelicula.model';
import { PeliculaService } from '../../core/servicios/pelicula/pelicula.service';

@Component({
  selector: 'app-creacion-pelicula',
  standalone: true,
  imports: [GeneratorComponent],
  //templateUrl: './creacion-pelicula.component.html',
  template: `
  <h1>Crear Pelicula</h1>
  @if (mensaje) {
    <div>
      {{mensaje}}
    </div>
  }
  <app-generator 
  (generarData)="subirDatos($event)"></app-generator>
  `,
  styleUrl: './creacion-pelicula.component.css'
})
export class CreacionPeliculaComponent implements OnInit {

  public mensaje ?: string;

  public file ?: File;
  
  constructor(private ruta : ActivatedRoute, private service : PeliculaService) {}

  ngOnInit(): void {
    
  }

  public subirDatos(form : FormData) {
    this.service.postPelicula(form).subscribe(res =>{
      this.mensaje = res;
    });
  }


}
