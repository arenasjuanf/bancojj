import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  searchKeys = ['id', 'nombre', 'saldo', 'estado']
  formProperties = ['rol', 'estado', 'fecha'];
  tableProperties = ['id', 'usuario', 'nombre', 'saldo', 'estado', 'tipo_cuenta', 'creacion'];
  listTitle = 'Cuentas bancarias';

  constructor() { }

  ngOnInit(): void { }

  filterSearchForm(evento) {
    console.log("Eventoooooo ", evento);
  }

}
