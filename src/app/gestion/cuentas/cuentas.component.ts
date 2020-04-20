import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../../shared/services/cuentas.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  formProperties = ['rol', 'estado', 'fecha'];
  tableProperties = ['id', 'usuario', 'nombre', 'saldo', 'estado', 'tipo_cuenta', 'creacion', 'modificada'];
  listTitle = 'Cuentas';
  accountData = [];
  mostrarLista: boolean = false;

  constructor(private cuentasService: CuentasService, private appService: AppService) {
    this.appService.pageTitle = this.listTitle + ' - Banco WD';
  }

  ngOnInit(): void {
    this.obtenerCuentas();
  }

  filterSearchForm(evento) {
    console.log("Eventoooooo ", evento);
  }

  obtenerCuentas() {
    this.cuentasService.obtenerCuentas('listar').subscribe(cuentas => {
      if (cuentas['success']) {
        this.accountData = cuentas['mensaje'];
        this.accountData.map(cuenta => {
          delete cuenta['password'];
        });
      } else {
        //console.log("Cuentas ", cuentas);
      }
      this.mostrarLista = true;
    }, error => {
      console.log("Error ", error);
      this.mostrarLista = true;
    });
  }

}
