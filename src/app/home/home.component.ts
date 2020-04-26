import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MovimientosService } from '../shared/services/movimientos.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CuentasService } from '../shared/services/cuentas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  arrayMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  arrayNumberMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  displayRangeModel = 3;
  dataGraphOne = [{}];
  optionsGraphOne = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  colorsGraphOne = [{
    backgroundColor: 'rgba(87, 181, 255, .85)',
    borderColor: 'rgba(87, 181, 255, 1)',
    pointBorderColor: 'rgba(0,0,0,0)',
    pointBackgroundColor: 'rgba(0,0,0,0)'
  }];
  dataGraphTwo = [{}];
  optionsGraphTwo = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  colorsGraphTwo = [{
    backgroundColor: '#673AB7'
  }];


  constructor(
    private appService: AppService,
    private movementsServices: MovimientosService,
    private sppiner: NgxSpinnerService,
    private accountService: CuentasService,
  ) {
    this.appService.pageTitle = 'Home';
  }

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    this.sppiner.show();
    this.movementsServices.listarEstadistica('listar-estadistica').subscribe(movements => {
      if (movements['success']) {
        this.orderDataStadisticsMovements(movements['mensaje']);
      }
      this.getAccounts();
    }, error => {
      console.log("Error ", error);
      this.sppiner.hide();
    });
  }

  orderDataStadisticsMovements(list: Array<object>) {
    let arrayData = [{
      label: 'Transacciones',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderWidth: 2,
      lineTension: 0
    }]
    list.forEach(movement => {
      const month = this.arrayNumberMonths.findIndex(month => {
        return +month === (moment(movement['created_at']).month() + 1);
      });
      arrayData[0]['data'][month]++;
    });
    this.dataGraphOne = arrayData;
    this.sppiner.hide();
  }

  getAccounts() {
    this.accountService.listarEstadistica('listar-estadistica').subscribe(accounts => {
      if (accounts['success']) {
        this.orderDataStadisticsAccounts(accounts['mensaje']);
      } else {
        this.sppiner.hide();
      }
    }, error => {
      console.log("Error ", error);
      this.sppiner.hide();
    });
  }

  orderDataStadisticsAccounts(list: Array<object>) {
    let arrayData = [{
      borderWidth: 0,
      label: 'Cuentas',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }]
    list.forEach(movement => {
      const month = this.arrayNumberMonths.findIndex(month => {
        return +month === (moment(movement['created_at']).month() + 1);
      });
      arrayData[0]['data'][month]++;
    });
    this.dataGraphTwo = arrayData;
    this.sppiner.hide();
  }

}
