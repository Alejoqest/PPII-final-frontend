import { Component, Input, OnInit } from '@angular/core';
import { PeliculaService } from '../../../core/servicios/pelicula/pelicula.service';
import { Pelicula } from '../../../core/modelos/pelicula.model';
//import { sa } from '../../../../../public/pelicula/';

@Component({
  selector: 'pelicula-portada',
  standalone: true,
  imports: [],
  //templateUrl: './portada.component.html',
  template : `<div><img [src]="url" [alt]="'portada '+id"></div>`,
  styleUrl: './portada.component.css'
})
export class PortadaComponent implements OnInit {

  @Input({required : true}) public id !: number;

  public url : string = '';

  constructor (private service : PeliculaService) {}

  ngOnInit(): void {
    this.service.getPeliculaPortada(this.id).subscribe(
      {
        next: (portada : Pelicula.PeliculaPortada) => this.url =  'pelicula/' + portada.url,
        error : () => this.url = this.url
      }
    )  
  }


}
