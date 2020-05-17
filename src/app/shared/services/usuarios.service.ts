import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { prop } from '@rxweb/reactive-form-validators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase = environment.urlApi;
  path = 'usuarios/';
  headers = new HttpHeaders({
    'Authorization': localStorage.getItem('token'),
    'tokenTime': localStorage.getItem('tiempoToken')
  });

  constructor(private http: HttpClient) { }

  /* Metodos */

  obtenerUsuarios(extension) {
    return this.http.get(this.construirUrl(extension), { headers: this.headers });
  }

  construirUrl(extension) {
    return this.urlBase + this.path + extension;
  }

  getUserCreate(extension) {
    return this.http.get(this.construirUrl(extension), { headers: this.headers });
  }

  inactivarUsuario(extension) {
    return this.http.get(this.construirUrl(extension), { headers: this.headers })
  }

}
