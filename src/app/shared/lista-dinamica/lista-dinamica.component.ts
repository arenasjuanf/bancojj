import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-dinamica',
  templateUrl: './lista-dinamica.component.html',
  styleUrls: ['./lista-dinamica.component.scss']
})
export class ListaDinamicaComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formularioValue = new EventEmitter();
  }

  @Input() propertiesForm: Array<string>;
  @Input() propertiesTable: Array<string>;
  @Input() dataTable: Array<object>;
  @Input() title: string;
  @Output() formularioValue: EventEmitter<FormGroup>;
  formFilter: FormGroup;
  structureArrayData: Array<string> = [];
  status = [{
    value: 1, viewValue: 'Activo'
  }, {
    value: 0, viewValue: 'Inactivo'
  }];
  sortBy: string = 'id';
  sortDesc: boolean = true;
  perPage: number = 10;
  filterVal: string = '';
  currentPage: number = 1;
  totalItems: number = 0;
  usersData: object[] = [];
  originalUsersData: object[] = [];
  structureForm: Array<object> = [];

  ngOnInit(): void {
    this.configForm();
    this.structureData();
  }

  configForm() {
    this.formFilter = this.formBuilder.group({});
    this.propertiesForm.forEach(property => {
      this.formFilter.addControl(property, new FormControl('', { validators: Validators.required }));
      const object = {
        clase: 'mb-' + (this.propertiesForm.length === 4 ? '3' : '4'),
        propiedad: property
      }
      switch (property) {
        case 'estado':
          object['input'] = 'select-estado';
          break;
        case 'rol':
          object['input'] = 'select-rol';
          break;
        case 'fecha':
          object['input'] = 'input-fecha';
          break;
        default:
          object['input'] = property;
          break;
      }
      this.structureForm.push(object);
    });
    const boton = {
      clase: 'mb-' + (this.propertiesForm.length === 4 ? '3' : '4'),
      propiedad: 'Buscar',
      input: 'boton'
    }
    this.structureForm.push(boton);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.structureArrayData);
    this.totalItems = data.length;
    this.sort(data);
    this.usersData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    if (!filter) {
      return data.slice(0);
    } else {
      let array = [];
      data.forEach(item => {
        const resultado = item.filter(k => {
          k = typeof k === 'number' ? k + '' : k
          return k.toLowerCase().indexOf(filter) > -1
        });
        resultado.length > 0 ? array.push(item) : ''
      });
      return array;
    }
  }

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];
      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;
    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }
    this.currentPage = 1;
    this.update();
  }

  searchFilter() {
    if (this.formFilter.valid) {
      this.formularioValue.emit(this.formFilter.value);
    } else {
      console.log("EL formualrio esta invalido");
    }
  }

  structureData() {
    this.structureArrayData = [];
    this.dataTable.forEach((item: object) => {
      const valores = Object.values(item);
      this.structureArrayData.push(this.validateDate(valores));
    });
    this.update();
  }

  accountSelected(account) {
    if (this.title === 'Cuentas') {
      this.router.navigateByUrl('movimientos/' + account[0]);
    }
  }

  validateDate(values) {
    return values.map((value, index) => {
      if (!isNaN((new Date(value)).getTime()) && typeof value !== 'number') {
        return moment(value).locale('es').format('LLL');
      }
      value = this.validateState(index, value);
      return value;
    });
  }

  validateState(position, value) {
    if (this.propertiesTable[position] === 'estado') {
      return value === 1 ? 'Activo' : 'Inactivo';
    }
    return value
  }

  deleteUnderscore(value) {
    return value.replace('_', ' ');
  }

}
