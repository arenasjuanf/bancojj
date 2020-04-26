import { Component, OnInit } from '@angular/core';
import { RxFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { CreateUserModel } from './modelo-crear-usuario';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss']
})
export class CrearUsuariosComponent implements OnInit {

  formUser: RxFormGroup;
  dataUser: object;

  constructor(private formBuilder: RxFormBuilder, private userService: UsuariosService, private snackBar: MatSnackBar) {
    this.dataUser = JSON.parse(localStorage.getItem('datosUsuario'));
  }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.formUser = <RxFormGroup>this.formBuilder.formGroup(new CreateUserModel());
    this.formUser.get('usuario_creador').setValue(this.dataUser['id']);
  }

  saveUser() {
    if (this.formUser.valid) {
      let datosGuardar = this.formUser.value;
      datosGuardar['nro_documento'] = datosGuardar['nro_documento'] + '';
      this.userService.crearUsuario('crear', datosGuardar).subscribe(respuesta => {
        this.openSnackBar(respuesta['mensaje'],':)');
      });
    } else {
      console.log("Formualrio in valido ", this.formUser.valid);
    }
  }

  clearForm() {
    this.formUser.reset();
  }

  openSnackBar(mensaje: string, action: string) {
    this.snackBar.open(mensaje, action, {
      duration: 2000,
    });
  }

}
