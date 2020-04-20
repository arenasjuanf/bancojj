import { Component, OnInit } from '@angular/core';
import { MovimientosService } from 'src/app/shared/services/movimientos.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  formProperties = ['monto', 'saldo_Actual', 'saldo_anterior', 'fecha'];
  tableProperties = ['id', 'monto', 'saldo_anterior', 'saldo_Actual', 'creador', 'cuenta', 'transaccion', 'creacion', 'modificado'];
  listTitle = 'Movimientos';
  mostrarLista: boolean = false;
  movementsData = [{ hola: 2 }, { hola: 2 }, { hola: 2 }]

  constructor(
    private movementsService: MovimientosService,
    private activateRoute: ActivatedRoute,
    private appService: AppService
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

  filterSearch(evento) {
    console.log("Eventoooooo ", evento);
  }

  resultAccountSeledtedList(id) {
    this.movementsService.obtenerMovimientosCuenta('listar/' + id).subscribe(movimientos => {
      if (movimientos['success']) {
        this.movementsData = movimientos['mensaje'];
      } else {
        //console.log("Movimientos ", movimientos);
      }
      this.mostrarLista = true;
    }, error => {
      this.mostrarLista = true;
      console.log("Erroror ", error);
    });
  }

}
