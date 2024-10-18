import { Injectable } from '@angular/core';
import { DialogComponent } from '../../componentes/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
 // public visible = false;
  public dialogs : DialogComponent[] = [];

  constructor() { }

  anadir(dialog : DialogComponent) {
    if (this.dialogs.find(d => d.id === dialog.id)) throw new Error('Se necesita un id unico');
    this.dialogs.push(dialog);
  }

  sacar(dialog : DialogComponent) {
    this.dialogs = this.dialogs.filter(d => d === dialog);
  }

  abrir(id : string) {
    console.log(this.dialogs);
    const dialog = this.dialogs.find(d => d.id = id);

    if (!dialog) throw new Error(`Dialog con id = ${id} no fue encontrado`);

    console.log(`Se encontro el ${dialog.id}`)

    dialog.abrir();
  }

  cerrar(id : string) {
    const dialog = this.dialogs.find(d => d.id = id);

    if (!dialog) throw new Error(`Dialog con id = ${id} no fue encontrado`);

    dialog.cerrar();
  }
}
