import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlBase = environment.urlApi;
  headers = new HttpHeaders({
    'Authorization': localStorage.getItem('token'),
    'tokenTime': localStorage.getItem('tiempoToken')
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  iniciarSesion(usuario, clave) {
    const credenciales = 'login/' + usuario + '/' + clave;
    return this.http.get(this.construirRuta(credenciales));
  }

  checkearSesion() {
    if (localStorage.getItem('logged') && localStorage.getItem('datosUsuario')) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    localStorage.setItem('logged', 'false');
    localStorage.removeItem('datosUsuario');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  construirRuta(opcion: string) {
    return this.urlBase + opcion;
  }

  crearUsuario(datos: object) {
    return this.http.post(this.construirRuta('usuarios/crear'), datos, { headers: this.headers });
  }

  crearCuenta(datos: object) {
    return this.http.post(this.construirRuta('cuentas/crear'), datos, { headers: this.headers });
  }

  listarUsuarios() {
    return this.http.get(this.construirRuta('usuarios/listar'), { headers: this.headers });
  }

  getUserAccounts(idUser) {
    return this.http.get(this.construirRuta('cuentas/listar/' + idUser), { headers: this.headers });
  }

  consignarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/consignar'), datos, { headers: this.headers });
  }

  retirarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/retirar'), datos, { headers: this.headers });
  }

  cancelarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/cancelar'), datos, { headers: this.headers });
  }

}
