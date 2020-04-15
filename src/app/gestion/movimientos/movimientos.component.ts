import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  searchKeys = ['id', 'account', 'email', 'name'];//['id', 'monto', 'saldo_anterior', 'saldo_actual', 'fk_usuario_creador', 'fk_cuenta']
  formProperties = ['monto', 'estado', 'fecha'];//['id', 'monto', 'saldo_anterior', 'saldo_actual', 'fk_usuario_creador', 'fk_cuenta']
  tableProperties = ['id', 'monto', 'saldo_anterior', 'saldo_Actual', 'fk_usuario_creador', 'cuenta', 'transaccion', 'created_at', 'updated_at'];
  listTitle = 'Movimientos realizados';

  constructor() { }

  ngOnInit() {
  }

}
