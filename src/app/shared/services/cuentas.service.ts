import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  urlBase = environment.urlApi;
  path = 'cuentas/';
  headers = new HttpHeaders({
    'Authorization': localStorage.getItem('token'),
    'tokenTime': localStorage.getItem('tiempoToken')
  });

  constructor(private http: HttpClient) { }

  obtenerCuentas(extension) {
    return this.http.get(this.construirUrl(extension), { headers: this.headers })
  }

  construirUrl(extension) {
    return this.urlBase + this.path + extension;
  }

  filtrar(extension, values) {
    return this.http.post(this.construirUrl(extension), values, { headers: this.headers });
  }

  listarEstadistica(extension) {
    return this.http.get(this.construirUrl(extension), { headers: this.headers })
  }

}
