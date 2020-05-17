import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdministradorService } from '../../shared/services/administrador.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogInModel } from './modelo-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {

  fondo: any;
  formulario: FormGroup;

  constructor(
    private appService: AppService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private adminService: AdministradorService,
    private _rxFormBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private sppiner: NgxSpinnerService,
  ) {
    this.appService.pageTitle = 'Inicia Sesión';
    this.fondo = this.setFondo();
    this.initForm();
  }

  ngOnInit() {
  }

  signIn() {
    this.sppiner.show();
    const usuario = this.formulario.get('usuario').value;
    const clave = this.formulario.get('clave').value;
    this.adminService.iniciarSesion(usuario, clave).subscribe(result => {
      if (result['success']) {
        if (result['usuario']['fk_perfil'] === 1) {
          this.openSnackBar(result['msg'] ? result['msg'] : 'Bienvenido a Banco WD', '!')
          localStorage.setItem('logged', 'true');
          localStorage.setItem('datosUsuario', JSON.stringify(result['usuario']));
          localStorage.setItem('token', result['token']);
          localStorage.setItem('tiempoToken', result['tokenTiempo'].exp);
          this.router.navigateByUrl('/');
        } else {
          this.openSnackBar(result['msg'] ? result['msg'] : 'Plataforma solo para administradores.', '!')
        }
      } else {
        this.formulario.get('clave').setValue('');
        this.openSnackBar(result['msg'] ? result['msg'] : 'Plataforma solo para administradores.', '!')
      }
      this.sppiner.hide();
    }, error => {
      this.sppiner.hide();
      console.log('errorsini: ', error);
    });
  }

  setFondo() {
    const num = Math.floor(Math.random() * 12);
    const fondo = `background-image: url('../assets/vendor/img/${num}.jpg');`;
    return this.sanitizer.bypassSecurityTrustStyle(fondo);
  }

  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      duration: 3000,
    });
  }

  initForm() {
    this.formulario = this._rxFormBuilder.group(new LogInModel());
  }

}
