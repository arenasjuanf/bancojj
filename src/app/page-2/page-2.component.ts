import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { UsuariosService } from '../shared/services/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss']
})
export class Page2Component implements OnInit {

  arrayMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrayDates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  citiesUser: Array<string> = ['Medellin', 'Madrid', 'Nueva York', 'Buenos Aires', 'Paris', 'Moscú', 'Beijing'];
  dataUser: object = {};
  usersCreate: Array<object> = [];
  chart1Data = [{}, {}];
  chart1Options = {
    scales: {
      xAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          fontColor: '#aaa'
        }
      }],
      yAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          fontColor: '#aaa',
          stepSize: 20
        }
      }]
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart1Colors = [{
    backgroundColor: 'rgba(28,180,255,.05)',
    borderColor: 'rgba(28,180,255,1)'
  }, {
    backgroundColor: 'rgba(136, 151, 170, 0.1)',
    borderColor: '#8897aa'
  }];

  constructor(
    private appService: AppService,
    private userService: UsuariosService,
    private sppiner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {
    this.appService.pageTitle = 'Mi perfil';
    this.dataUser = JSON.parse(localStorage.getItem('datosUsuario'));
    this.getUsersCreate();
  }

  ngOnInit(): void {
    this.cityUser();
  }

  cityUser() {
    this.dataUser['ciudad'] = this.citiesUser[this.numberRandom(7)];
  }

  numberRandom(cant: number) {
    return Math.floor(Math.random() * cant);
  }

  seeDate(date, format) {
    moment.locale('es');
    return moment(date).format(format);
  }

  getUsersCreate() {
    this.sppiner.show();
    this.userService.getUserCreate(this.dataUser['id']).subscribe(usuarios => {
      if (usuarios['success']) {
        this.usersCreate = usuarios['mensaje'];
        this.usersCreate.map(user => {
          user['foto'] = `assets/img/avatars/${this.numberRandom(12) + 1}.png`
        });
        this.orderDataStadistics();
      } else {
        this.sppiner.hide();
      }
    }, error => {
      console.log("Error ", error);
      this.sppiner.hide();
    });
  }

  orderDataStadistics() {
    let arrayData = [{
      label: 'Activos',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderWidth: 1
    }, {
      label: 'Inactivos',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderWidth: 1
    }]
    this.usersCreate.forEach(user => {
      const month = this.arrayDates.findIndex(month => {
        return +month === (moment(user['created_at']).month() + 1);
      });
      user['estado'] === 1 ? arrayData[0]['data'][month]++ : arrayData[1]['data'][month]++
    });
    this.chart1Data = arrayData;
    this.sppiner.hide();
  }

  inactivateUser(userId, posicion) {
    const datos = {
      title: '¿Cambiar el estado del usuario?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      preConfirm: (login) => { },
      allowOutsideClick: () => !Swal.isLoading()
    }
    Swal.fire(datos).then((result) => {
      this.sppiner.show();
      if (result.value) {
        this.userService.inactivarUsuario('inactivar/' + userId).subscribe(respuesta => {
          this.usersCreate[posicion]['estado'] = (this.usersCreate[posicion]['estado'] === 1 ? 0 : 1);
          this.openSnackBar(respuesta['mensaje'], '!');
          this.orderDataStadistics();
          this.sppiner.hide();
        }, error => {
          this.openSnackBar('Error cambiando estado.', '!');
          this.sppiner.hide();
        });
      } else {
        this.sppiner.hide();
      }
    });
  }

  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      duration: 2000,
    });
  }

}
