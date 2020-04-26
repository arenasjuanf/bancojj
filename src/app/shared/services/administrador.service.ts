import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlBase = environment.urlApi;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    console.log('servicio inciado correctamente');
    this.iniciarSesion('narutousumaki', '12345');
  }

  iniciarSesion(usuario, clave) {
    const credenciales = 'login/' + usuario + '/' + clave;
    return this.http.get(this.construirRuta(credenciales));
  }

  checkearSesion(){
    if(localStorage.getItem('logged') && localStorage.getItem('datosUsuario')){
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion(){
    localStorage.setItem('logged', 'false');
    localStorage.removeItem('datosUsuario');
    this.router.navigateByUrl('/login');
  }

  construirRuta(opcion: string) {
    return this.urlBase + opcion;
  }


}