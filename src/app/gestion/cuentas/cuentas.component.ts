import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  searchKeys = ['id', 'account', 'email', 'name'];//['id', 'nombre', 'saldo', 'estado']
  formProperties = ['rol', 'estado', 'fecha'];//['id', 'nombre', 'saldo', 'estado']
  listTitle = 'Cuentas bancarias';

  constructor() { }

  ngOnInit(): void { }

}
