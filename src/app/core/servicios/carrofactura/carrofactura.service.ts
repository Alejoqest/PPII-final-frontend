import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarroFactura } from '../../modelos/carrofactura.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroFacturaService {

  private url : string = 'http://localhost:8080/api/v1/'

  constructor(private http : HttpClient) {}

  public getCarro() : Observable<CarroFactura.CarroCompras> {
    return this.http.get<CarroFactura.CarroCompras>(this.url + 'carro/');
  }

  public getCarroElementos() : Observable<CarroFactura.CarroElemento[]> {
    return this.http.get<CarroFactura.CarroElemento[]>(this.url + 'carro/elementos');
  }

  public getFacturas(numPag : number) : Observable<CarroFactura.Factura[]> {
    return this.http.get<CarroFactura.Factura[]>(this.url + `facturas/${numPag}`)
  }

  public getFacturasDetalles(id : number) : Observable<CarroFactura.DetallesFactura[]> {
    return this.http.get<CarroFactura.DetallesFactura[]>(this.url + `facturas/${id}/detalles`);
  }

  public putCarroElemento(ele : CarroFactura.CarroElemento) : Observable<CarroFactura.CarroCompras> {
    return this.http.put<CarroFactura.CarroCompras>(this.url + 'carro/actualizar', ele);
  }

  public putCarroVacio() : Observable<CarroFactura.CarroCompras> {
    return this.http.put<CarroFactura.CarroCompras>(this.url + 'carro/vaciar', null);
  }

  public postFacturaCarro() : Observable<CarroFactura.CarroCompras> {
    return this.http.post<CarroFactura.CarroCompras>(this.url + 'carro/factura', null);
  }

  public postFactura(factura : CarroFactura.FacturaIntento) {
    return this.http.post<CarroFactura.Factura>(this.url + 'factura/nueva', factura);
  }
}
