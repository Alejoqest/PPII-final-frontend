import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../core/modelos/pelicula.model';
import { PeliculaService } from '../../core/servicios/pelicula/pelicula.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EngineComponent } from './componentes/engine/engine.component';
import { WrapperComponent } from "../../compartido/componentes/wrapper/wrapper.component";
import { Http } from '../../core/modelos/http.model';
import { BusEventoService } from '../../core/servicios/busEvento/bus-evento.service';
import { PeliculaCantidadComponent } from './componentes/pelicula-cantidad/pelicula-cantidad.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [RouterModule, EngineComponent, WrapperComponent, PeliculaCantidadComponent],
  //templateUrl: './busqueda.component.html',
  template: `
  <div class="section flow-section flex-center">
    <search-engine (buscar)="realizarBusqueda($event)" class="full-content" ></search-engine>
  </div>
  <div class="section">
    <pelicula-cantidad [cantidad]="amount" [busqueda]="hayBusqueda" [paginaActual]="parametros.numPag"/>
  </div>
  <div class="section">
    <movie-search-wrapper [resultados]="peliculas" [busqueda]="hayBusqueda"/>
  </div>
  `,
  styleUrl: './busqueda.component.css'
})
export class BusquedaPage implements OnInit{
  public peliculas : Pelicula.PeliculaBusqueda[] = [];
  public amount : number = 0;
  public hayBusqueda : boolean = false;
  public sinResultados : boolean = false;
  public parametros !: Http.SearchQueries;

  constructor(private service : PeliculaService, private bus : BusEventoService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() : void {
    this.obtenerParametros();
    this.suscribirEventos();
  }

  private obtenerParametros() : void {
    this.route.queryParamMap.subscribe((param) => {
      this.parametros = {
        nombre : param.get('nombre') || "",
        sinStock : param.get('sinStock') || "false",
        ordenTiempo : param.get('ordenTiempo') || "false",
        ordenPrecio : param.get('ordenPrecio') || "false",
        numPag : param.get('numPag') || "1",
      };

      if (param.get('formato') && param.get('formato') !== "TODOS") {
        this.parametros = {
          ...this.parametros,
          formato : String(param.get('formato'))
        };
      }

      if (param.get('categoriaId') && param.get('categoriaId') != "0") {
        this.parametros = {
          ...this.parametros,
          categoriaId : String(param.get('categoriaId'))
        };
      }

      console.log(this.parametros);

      this.obtenerPeliculas(this.parametros);
      this.obtenerCantidadPeliculas(this.parametros);
    });
  }

  private obtenerPeliculas(data : Http.SearchQueries) : void {
    this.service.getPeliculasBusqueda(data).subscribe({
      next : (res : Pelicula.PeliculaBusqueda[]) => {
        this.peliculas = res;
        this.hayBusqueda = true;
      },
      error : (err : Http.Response) => {
        console.log(err)
        this.peliculas = [];
        this.hayBusqueda = true;
        this.sinResultados = true;
      }
    });
  }

  private obtenerCantidadPeliculas(data : Http.SearchQueries) : void {
    this.service.getPeliculaCantidad(data).subscribe({
      next : (val : {cantidad : number}) => this.amount = val.cantidad
    })
  }

  private suscribirEventos() {
    this.bus.suscribir('paginaCambio').subscribe((e) => {
      this.parametros = {
        ...this.parametros,
        numPag : String(e.data)
      };
      this.realizarBusqueda(this.parametros);
    })
  }

  public realizarBusqueda(data : any) : void {
    this.router.navigate([], {queryParams : data, queryParamsHandling: 'merge'})
  }

}