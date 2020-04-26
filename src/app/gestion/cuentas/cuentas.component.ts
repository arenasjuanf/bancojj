import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../../shared/services/cuentas.service';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  formProperties = ['nombre', 'estado', 'saldo'];
  tableProperties = ['id', 'usuario', 'nombre', 'saldo', 'estado', 'tipo_cuenta', 'creacion', 'modificada'];
  listTitle = 'Cuentas';
  accountData: Array<object> = [];

  constructor(
    private cuentasService: CuentasService,
    private appService: AppService,
    private sppiner: NgxSpinnerService,
  ) {
    this.appService.pageTitle = this.listTitle + ' - Banco WD';
  }

  ngOnInit(): void {
    this.obtenerCuentas();
  }

  filterSearchForm(data) {
    this.seeSpinner();
    const valores = {
      nombre: ['nombre', 'like', '%' + data['nombre'] + '%'],
      estado: ['estado', '=', data['estado']],
      saldo: ['saldo', '=', data['saldo'] + ''],
    }
    const keys = Object.keys(valores);
    let dataQuery = {};
    keys.forEach(key => {
      if (data[key] && data[key].length > 0) {
        dataQuery[key] = valores[key];
      }
    });
    this.cuentasService.filtrar('filter', dataQuery).subscribe(respuesta => {
      if (respuesta['success']) {
        this.accountData = respuesta['mensaje'];
        this.accountData.map(cuenta => {
          delete cuenta['password'];
        });
      }
      this.closeSpinner();
    }, error => {
      console.log("Error ", error);
      this.closeSpinner();
    });
  }

  obtenerCuentas() {
    this.seeSpinner();
    this.cuentasService.obtenerCuentas('listar').subscribe(cuentas => {
      if (cuentas['success']) {
        cuentas['mensaje'].map(cuenta => {
          delete cuenta['password'];
        });
        this.accountData = cuentas['mensaje'];
      }
      this.closeSpinner();
    }, error => {
      console.log("Error ", error);
      this.closeSpinner();
    });
  }

  seeSpinner() {
    this.sppiner.show();
  }

  closeSpinner() {
    this.sppiner.hide();
  }

}
