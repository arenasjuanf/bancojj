import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userModel } from './user-model';
import { AdministradorService } from 'src/app/shared/services/administrador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss']
})
export class CrearUsuariosComponent implements OnInit {

  formulario: FormGroup;
  userModel: userModel = new userModel();

  constructor(
    private _formBuilder: FormBuilder,
    private adminService: AdministradorService,
    private _snackBar: MatSnackBar,
    private appService: AppService,
    private sppiner: NgxSpinnerService,
  ) {
    this.appService.pageTitle = 'Usuarios';
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formulario = this._formBuilder.group(this.userModel);
  }

  cancelar() {
    this.formulario.reset();
  }

  crear() {
    if (this.formulario.value) {
      this.sppiner.show();
      const idUsuario = JSON.parse(localStorage.getItem('datosUsuario'))['usuario']['id'];
      this.formulario.value.usuario_creador = idUsuario;
      this.adminService.crearUsuario(this.formulario.value).subscribe(result => {
        if (result) {
          if (result['success']) {
            this.openSnackBar(result['mensaje'] ? result['mensaje'] : 'Usuario creado', '!');
            this.cancelar();
          } else {
            this.openSnackBar(result['mensaje'] ? result['mensaje'] : 'Error', '!');
          }
        }
        this.sppiner.hide();
      }, error => {
        this.openSnackBar(error.message, ':(');
        this.sppiner.hide();
      });
    }
  }

  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      duration: 2000,
    });
  }

}
