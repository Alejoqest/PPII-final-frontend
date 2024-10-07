import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../core/servicios/pelicula/pelicula.service';
import { Pelicula } from '../../core/modelos/pelicula.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Http } from '../../core/modelos/http.model';
import { PeliculaCuerpoComponent } from './componentes/pelicula-cuerpo/pelicula-cuerpo.component';
import { PeliculaDescripcionComponent } from './componentes/pelicula-descripcion/pelicula-descripcion.component';
import { CarroFactura } from '../../core/modelos/carrofactura.model';
import { CarroFacturaService } from '../../core/servicios/carrofactura/carrofactura.service';
import { PeliculaOpcionesComponent } from './componentes/pelicula-opciones/pelicula-opciones.component';
import { ImagenComponent } from '../../compartido/componentes/imagen/imagen.component';

@Component({
  selector: 'pelicula-info',
  standalone: true,
  imports: [
    RouterModule, 
    ImagenComponent,
    PeliculaCuerpoComponent, 
    PeliculaDescripcionComponent, 
    PeliculaOpcionesComponent
  ],
  //templateUrl: './pelicula.component.html',
  template : `<div class="section">
    @if (mensaje != '') {
      <h3>{{mensaje}}</h3>
    }
    @if (pelicula) {
      <div class="full-content grid-section grid-two-columns-auto">
        <imagen [src]="portada" [width]="22"/>
        <div>
          <pelicula-content [datos]="pelicula">
            <pelicula-opciones [info]="pelicula" (facturaSubir)="subirFactura($event)" (elementoSubir)="subirElemento($event)"/>
          </pelicula-content>
          <pelicula-descripcion [pelicula]="pelicula"/>
        </div>
      </div>
    } @else {
      <div class="section__header">
        <h2>Cargando...</h2>
      </div>
    }

  </div>`,
  styleUrl: './peliculaInfo.page.css'
})
export class PeliculaInfoPage implements OnInit {
  public pelicula ?: Pelicula.PeliculaDatos;
  public portada : string = 'pelicula/NOT_FOUND.jpg';
  public mensaje : string = '';

  constructor(private ruta : ActivatedRoute, private carroService : CarroFacturaService,
    private service : PeliculaService) {}

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((param) => {
      const id : number = Number(param.get("id"));
      this.obtenerPelicula(id);
      this.obtenerPortada(id);
    });
  }

  private obtenerPelicula(id : number) : void {
    this.service.getPeliculasDatos(id).subscribe({
      next : (data : Pelicula.PeliculaDatos) => this.pelicula = data,
      error : (error : Http.Response) => this.mensaje = error.mensaje
    });
      /*(data : Pelicula.PeliculaDatos) => {
      let resultado : Pelicula.PeliculaDatos[] = data.filter((dato) => {
        return dato.id == id;
      });
      if (!resultado.length) {
        this.hayFallo = true;
      }
      this.pelicula = resultado[0];
    }*/
  }

  public obtenerPortada(id : number) {
    this.service.getPeliculaPortada(id).subscribe({
      next: (portada : Pelicula.PeliculaPortada) => this.portada =  'pelicula/' + portada.url,
      error : () => this.portada = this.portada
    })  
  }

  public subirFactura(factura : CarroFactura.FacturaIntento) : void {
    this.carroService.postFactura(factura).subscribe({
      next : () => {
        this.mensaje = 'Se hizo la compra perfectamente.';
        if (this.pelicula?.stock) this.pelicula.stock = this.pelicula.stock  - factura.detalles[0].unidades;
      }
    });
  }
  
  public subirElemento(elemento : CarroFactura.CarroElemento) : void {
    this.carroService.putCarroElemento(elemento).subscribe({
      next : () => {
        this.mensaje = 'perfecto'
      }
    });
  }

}