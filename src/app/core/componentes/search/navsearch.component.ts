import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http } from '../../modelos/http.model';

@Component({
  selector: 'nav-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  //templateUrl: './search.component.html',
  template : `
  <form [formGroup]="form" (ngSubmit)="enviarQuery()" id="search-form">
    <input type="text" placeholder="Buscar" formControlName="busqueda">
    <input type="submit" value="Buscar">
  </form>`,
  styles : `
  #search-form {
    background-color: white;
    padding: 1rem;
    border: .1rem gray solid;
    border-radius: 1rem;
    input {
        background-color: white;
        border: none;
    }
    input[type=text]:focus {
        outline: none;
    }
  }`
  //styleUrl: './search.component.css'
})
export class navsearchComponent {

  public form : FormGroup = this.builder.group({
    busqueda : ['']
  });

  @Output() emitirDatos : EventEmitter<Http.SearchQueries> = new EventEmitter<Http.SearchQueries>();

  constructor (private builder : FormBuilder) {}

  enviarQuery() {
    this.emitirDatos.emit({
      nombre : this.busqueda?.value
    });
    this.form.patchValue({
      busqueda : ''
    })
  }

  get busqueda() : AbstractControl<any, string> | null {
    return this.form.get('busqueda');
  }
}
