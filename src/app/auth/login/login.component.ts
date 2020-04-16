import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdministradorService } from '../../shared/services/administrador.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogInModel } from './modelo-login';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loginService: LogInModel = new LogInModel();

  constructor(
    private appService: AppService,
    private router: Router, 
    private sanitizer: DomSanitizer,
    private adminService: AdministradorService,
    private _rxFormBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
    this.appService.pageTitle = 'Inicia Sesión';
    this.fondo = this.setFondo();
    this.initForm();
    
  }


  ngOnInit() {
  }

  signIn(){
    //this.router.navigateByUrl('');
    const usuario = this.formulario.get('usuario').value;
    const clave = this.formulario.get('clave').value;
    console.log(usuario,clave)
    this.adminService.iniciarSesion(usuario,clave).subscribe(result => {
      if(result){
        this.openSnackBar(result['msg'] ? result['msg'] : 'Ingreso Corrrecto' , '!')
      }
      if (result['success']) {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('datosUsuario', JSON.stringify(result));
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log('errorsini: ', error);
    })

  }

  setFondo(){
    const num = Math.floor(Math.random() * 17);
    const fondo = `background-image: url('../assets/vendor/img/${num}.jpg');`;
    return this.sanitizer.bypassSecurityTrustStyle(fondo);
  }

  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      duration: 2000,
    });
  }

  initForm(){
    this.formulario = this._rxFormBuilder.group(new LogInModel());
  }

}
