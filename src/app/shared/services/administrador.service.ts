import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlBase = environment.urlApi;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.iniciarSesion('narutousumaki', '12345');
  }

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
    this.router.navigateByUrl('/login');
  }

  construirRuta(opcion: string) {
    return this.urlBase + opcion;
  }

  crearUsuario(datos: object) {
    return this.http.post(this.construirRuta('usuarios/crear'), datos);
  }

  crearCuenta(datos: object) {
    return this.http.post(this.construirRuta('cuentas/crear'), datos);
  }

  listarUsuarios() {
    return this.http.get(this.construirRuta('usuarios/listar'));
  }

  getUserAccounts(idUser) {
    return this.http.get(this.construirRuta('cuentas/listar/' + idUser));
  }

  consignarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/consignar'), datos);
  }

  retirarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/retirar'), datos);
  }

  cancelarCuenta(datos: object) {
    return this.http.put(this.construirRuta('cuentas/cancelar'), datos);
  }

}
