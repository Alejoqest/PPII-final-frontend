import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { outboundsYearValidator } from '../../../core/recursos/outboundsYearValidator';
import { minValueValidator } from '../../../core/recursos/minValueValidator';
import { Pelicula } from '../../../core/modelos/pelicula.model';
import { Categoria } from '../../../core/modelos/categoria.model';

const outboundsYear = outboundsYearValidator();

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent implements OnInit {

  @Input() public formInfo?: Pelicula.PeliculaDatos;

  @Input({transform : parseCategorias}) public cateInfo?: string;

  @Input() public portada?: string;

  @Output() generarData = new EventEmitter<FormData>();

  @Output() mandarImagen = new EventEmitter<File>();

  private file ?: File;

  public form : FormGroup = this.formBuilder.group({
    portada : [null],
    nombre : ['', [Validators.required]],
    formato : ['', [Validators.required]],
    ano : [``, [Validators.required, outboundsYear]],
    descripcion : [''],
    precio : ['', [Validators.required, minValueValidator(0)]],
    stock : ['0', [Validators.required, minValueValidator(-1)]],
    categorias : ['']
  });

  public formatos = ["DVD", "BLURAY"];

  constructor(private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    if (this.formInfo) {
      this.restablecerCampos();
    }
  }

  restablecerCampos() {
    if (this.categorias) {
      this.form.patchValue({categorias : this.cateInfo});
    }
    this.form.patchValue({
      nombre : this.formInfo?.nombre,
      formato : this.formInfo?.formato,
      ano : this.formInfo?.ano,
      descripcion : this.formInfo?.descripcion,
      precio : this.formInfo?.precio,
      stock : this.formInfo?.stock
    });
  }
  
  cambiarImagen(event : any) {
    const archivos = event.target.files;

    if (archivos) {
      const imagen : File | null = archivos.item(0);

      if (imagen) {

        this.file = imagen;

        this.portada = '';

        const lector = new FileReader();

        lector.onload = (e : any) => {
          this.portada = e.target.result;
        };

        lector.readAsDataURL(this.file);
        this.mandarImagen.emit(this.file);
      }
    }
  }

  public subirInfo() : void {
    const dato : Pelicula.PeliculaCreacion = {
      nombre : this.nombre?.value,
      formato : this.formato?.value,
      ano : this.ano?.value,
      descripcion : this.descripcion?.value,
      precio : this.precio?.value,
      stock : this.stock?.value,
      categorias : parseString(this.categorias?.value)
    }
    
    const formData : any = new FormData();
    formData.append('data', new Blob([JSON.stringify(dato)], {type : 'application/json'}));
    formData.append('imagen', this.file);
    console.log(formData);

    this.generarData.emit(formData);
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get formato() {
    return this.form.get('formato');
  }

  get ano() {
    return this.form.get('ano');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get precio() {
    return this.form.get('precio');
  }

  get stock() {
    return this.form.get('stock');
  }

  get categorias() {
    return this.form.get('categorias');
  }

}


function parseCategorias(value: Categoria[] | undefined ) {
  const array : string[] | undefined = value?.map((v) => v.nombre);
  const str : string | undefined = array?.toString();
  return str?.replace(",", " ");
}

function parseString(value : string) {
  const array : string[] = value.split(" ");
  const objArray : Categoria[] = array.map((v) => {return {nombre : v}})
  return objArray;
}
