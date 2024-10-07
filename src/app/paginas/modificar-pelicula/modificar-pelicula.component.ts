import { Component, OnInit } from '@angular/core';
import { GeneratorComponent } from "../../compartido/componentes/generator/generator.component";
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../core/servicios/pelicula/pelicula.service';
import { Pelicula } from '../../core/modelos/pelicula.model';
import { Categoria } from '../../core/modelos/categoria.model';

@Component({
  selector: 'app-modificar-pelicula',
  standalone: true,
  imports: [GeneratorComponent],
  //templateUrl: './modificar-pelicula.component.html',
  template: `
  <h1>Modificar Datos</h1>
  @if (id && info && infoCategorias) {
    <app-generator [formInfo]="info" [cateInfo]="infoCategorias"></app-generator>
  }
  `,
  styleUrl: './modificar-pelicula.component.css'
})
export class ModificarPeliculaComponent implements OnInit {

  public id?: number;

  public info ?: Pelicula.PeliculaDatos;

  public infoCategorias ?: Categoria[];

  public portadaUrl ?: string;

  public mensaje ?: string;

  constructor(private ruta : ActivatedRoute, private service : PeliculaService) {}

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((param) => {
      this.id = Number(param.get("id"));
    });;
  }
  
  cargarDatos(id : number) {
    this.service.getPeliculasDatos(id).subscribe((res : Pelicula.PeliculaDatos) => {
      this.info = res;
    });
    this.service.getPeliculaCategorias(id).subscribe((res : Categoria[]) => {
      this.infoCategorias = res;
    })
  }

  actualizarPelicula(data : FormData) {
    this.service.putPelicula(data).subscribe((res) => {
      this.mensaje = res;
    });
  }

}
