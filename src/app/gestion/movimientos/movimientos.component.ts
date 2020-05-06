import { Component, OnInit } from '@angular/core';
import { MovimientosService } from 'src/app/shared/services/movimientos.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  formProperties = ['monto', 'saldo_Actual', 'saldo_anterior'];
  tableProperties = ['id', 'monto', 'saldo_anterior', 'saldo_Actual', 'creador', 'cuenta', 'transaccion', 'codigo', 'creacion', 'modificado'];
  listTitle = 'Movimientos';
  movementsData = [{ hola: 2 }, { hola: 2 }, { hola: 2 }]

  constructor(
    private movementsService: MovimientosService,
    private activateRoute: ActivatedRoute,
    private appService: AppService,
    private sppiner: NgxSpinnerService,
  ) {
    this.activateRoute.paramMap.subscribe(param => {
      const parameter = param['params'];
      if (parameter['id']) {
        this.resultAccountSeledtedList(parameter['id']);
      }
    });
    this.appService.pageTitle = this.listTitle + ' - Banco WD';
  }

  ngOnInit() {
  }

  filterSearch(data) {
    this.seeSpinner();
    const valores = {
      monto: ['monto', 'like', '%' + data['monto'] + '%'],
      saldo_Actual: ['saldo_Actual', '=', data['saldo_Actual']],
      saldo_anterior: ['saldo_anterior', '=', data['saldo_anterior'] + ''],
    }
    const keys = Object.keys(valores);
    let dataQuery = {};
    keys.forEach(key => {
      if (data[key] && data[key].length > 0) {
        dataQuery[key] = valores[key];
      }
    });
    this.movementsService.filtrar('filter', dataQuery).subscribe(respuesta => {
      if (respuesta['success']) {
        this.movementsData = respuesta['mensaje'];
      }
      this.closeSpinner();
    }, error => {
      this.closeSpinner();
      console.log("Erroror ", error);
    });
  }

  resultAccountSeledtedList(id) {
    this.seeSpinner();
    this.movementsService.obtenerMovimientosCuenta('listar/' + id).subscribe(movimientos => {
      if (movimientos['success']) {
        this.movementsData = movimientos['mensaje'];
      }
      this.closeSpinner();
    }, error => {
      console.log("Erroror ", error);
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
