import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImagenComponent } from '../../../../compartido/componentes/imagen/imagen.component';
import { Usuario } from '../../../../core/modelos/usuario.model';

@Component({
  selector: 'foto-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, ImagenComponent],
  //templateUrl: './foto-perfil.component.html',
  template: `<div class="fit-content">
    <imagen [src]="'usuario/' + data.nombreArchivo"/>
    <input type="file" (change)="cambiarImagen($event)" class="body-block">
  </div>`,
  styleUrl: './foto-perfil.component.css'
})
export class FotoPerfilComponent {
  @Input({required : true}) public data !: Usuario.UsuarioFoto;

  @Output() public mandarImagen : EventEmitter<File> = new EventEmitter<File>(); 

  public campo : FormControl = new FormControl([]);

  public file ?: File;

  cambiarImagen(event : any) {
    const archivos = event.target.files;

    if (archivos) {
      const imagen : File | null = archivos.item(0);

      if (imagen) {
        this.mandarImagen.emit(this.file);
      }
    }
  }
}
