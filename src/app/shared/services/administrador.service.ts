import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlBase = environment.urlApi;

  constructor(
    private http: HttpClient
  ) {
    console.log('servicio inciado correctamente');
    this.iniciarSesion('narutousumaki', '12345');
  }

  iniciarSesion(usuario, clave) {
    const credenciales = 'login/' + usuario + '/' + clave;
    this.http.get(this.construirRuta(credenciales)).subscribe(result => {
      if (result['success']) {
        console.log('resultadini: ', result['usuario']);
      }
    }, error => {
      console.log('errorsini: ', error);
    })
  }


  construirRuta(opcion: string) {
    return this.urlBase + opcion;
  }


}
