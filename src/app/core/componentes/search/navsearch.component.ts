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
    <label for="subir"><i class="bx bx-search"></i></label>
    <input type="submit" id="subir" value="Buscar">
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
    input[type=submit] {
      display: none;
    }
  }`
  //styleUrl: './search.component.css'
})
export class navsearchComponent {
  @Output() emitirDatos : EventEmitter<Http.SearchQueries> = new EventEmitter<Http.SearchQueries>();

  public form : FormGroup = this.builder.group({
    busqueda : ['']
  });


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
