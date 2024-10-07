import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusEventoService {

  private bus : Subject<any> = new Subject<any>(); 

  public publicar(evento : any) : void {
    this.bus.next(evento);
  }

  public suscribir(nombreEvento : String) : Observable<any> {
    return this.bus.asObservable().pipe(
      filter((e : any) => e.name == nombreEvento)
    );
  }
}
