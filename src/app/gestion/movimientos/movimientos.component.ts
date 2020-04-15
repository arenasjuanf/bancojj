import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  searchKeys = ['id', 'monto', 'saldo_anterior', 'saldo_actual', 'fk_usuario_creador', 'fk_cuenta']
  formProperties = ['monto', 'estado', 'fecha'];
  tableProperties = ['id', 'monto', 'saldo_anterior', 'saldo_Actual', 'creador', 'cuenta', 'transaccion', 'creacion'];
  listTitle = 'Movimientos realizados';

  constructor() { }

  ngOnInit() {
  }

  filterSearch(evento) {
    console.log("Eventoooooo ", evento);
  }

}
