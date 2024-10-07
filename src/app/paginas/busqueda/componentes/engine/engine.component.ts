import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../core/servicios/categoria/categoria.service';
import { Categoria } from '../../../../core/modelos/categoria.model';
import { ActivatedRoute } from '@angular/router';
import { Http } from '../../../../core/modelos/http.model';

interface SearchQueries {
  nombre ?: string;
  formato ?: string;
  sinStock ?: boolean;
  categoria ?: number;
  ordenPrecio ?: boolean;
  ordenTiempo ?: boolean;
}

@Component({
  selector: 'search-engine',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.css'
})
export class EngineComponent implements OnInit {

  @Output() buscar = new EventEmitter<any>();

  public searchForm : FormGroup = this.formBuilder.group({
    nombre : [''],
    formato : ['TODOS'],
    sinStock : ['false'],
    categoria : ['0'],
    ordenPrecio : ['false'],
    ordenTiempo : ['false']
  });

  public categorias ?: Categoria[];

  public formatos : string[] = ['DVD', 'BLURAY'];

  private data?: Http.SearchQueries;

  constructor(private formBuilder : FormBuilder, 
    private route : ActivatedRoute,
    private cService : CategoriaService) {}

  ngOnInit(): void {
    this.cService.getCategorias().subscribe((res : Categoria[]) => {
      this.categorias = res;
    });
    this.route.queryParamMap.subscribe((query) => {
      this.searchForm.patchValue({
        nombre : query.get('nombre') || '',
        formato : query.get('formato') || 'TODOS',
        sinStock : query.get('sinStock') || "false",
        categoria : query.get('categoria') || "0",
        ordenPrecio : query.get('ordenPrecio') || "false",
        ordenTiempo : query.get('ordenTiempo') || "false"
      });
    });
  }

  enviarParametros() {
    this.data = {
      ...this.data,
      nombre : this.nombre?.value,
      ordenPrecio : this.ordenPrecio?.value,
      ordenTiempo : this.ordenTiempo?.value
    }
    this.buscar.emit(this.data);
  } 

  cambiarFormato() {
    if (this.formato?.value != 'TODOS') {
      this.data = {
        ...this.data,
        nombre : this.nombre?.value,
        ordenPrecio : this.ordenPrecio?.value,
        ordenTiempo : this.ordenTiempo?.value,
        formato : this.formato?.value
      }
    }
  }

  cambiarCategoria() {
    if (this.categoria?.value != "0") {
      this.data = {
        ...this.data,
        nombre : this.nombre?.value,
        ordenPrecio : this.ordenPrecio?.value,
        ordenTiempo : this.ordenTiempo?.value,
        categoriaId : this.categoria?.value
      }
    }
  }

  get nombre() {
    return this.searchForm.get('nombre');
  }

  get formato() {
    return this.searchForm.get('formato');
  }

  get sinStock() {
    return this.searchForm.get('sinStock');
  }

  get categoria() {
    return this.searchForm.get('categoria');
  }

  get ordenPrecio() {
    return this.searchForm.get('ordenPrecio');
  }

  get ordenTiempo() {
    return this.searchForm.get('ordenTiempo')
  }

}
