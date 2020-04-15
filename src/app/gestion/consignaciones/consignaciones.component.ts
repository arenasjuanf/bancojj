import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consignaciones',
  templateUrl: './consignaciones.component.html',
  styleUrls: ['./consignaciones.component.scss']
})
export class ConsignacionesComponent implements OnInit {

  searchKeys = ['id', 'account', 'email', 'name'];
  formProperties = ['rol', 'estado', 'fecha'];
  listTitle = 'Consignaciones';

  constructor() { }

  ngOnInit() {
  }

}
