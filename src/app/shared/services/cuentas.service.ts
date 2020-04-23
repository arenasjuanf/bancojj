import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  urlBase = environment.urlApi;
  path = 'cuentas/'

  constructor(private http: HttpClient) { }

  obtenerCuentas(extension) {
    return this.http.get(this.construirUrl(extension))
  }

  construirUrl(extension) {
    return this.urlBase + this.path + extension;
  }

  filtrar(extension, values) {
    return this.http.post(this.construirUrl(extension), values);
  }

}
