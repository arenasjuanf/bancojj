import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase = environment.urlApi;
  path = 'usuarios/'

  constructor(private http: HttpClient) {

  }

  obtenerUsuarios(extension) {
    return this.http.get(this.construirUrl(extension))
  }

  construirUrl(extension) {
    return this.urlBase + this.path + extension;
  }

}
