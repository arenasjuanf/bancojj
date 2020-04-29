import { Component, OnInit, HostBinding } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
    '../../../vendor/styles/pages/clients.scss',
    './usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UsuariosService, private spinner: NgxSpinnerService) { }

  @HostBinding('class') hostClasses = 'd-flex flex-grow-1 align-items-stretch h-100';

  selectedClient: object = {};
  sideboxOpened = false;
  clientsData: Array<object> = [];
  dataSeeUsers: Array<object> = [];
  filterValue: string = '';
  searchKeys = ['nombres', 'apellidos', 'correo', 'telefono'];
  sortBy: string = 'id';
  sortDesc: boolean = true;
  perPage: number = 10;
  currentPage: number = 1;

  selectClient(client) {
    this.selectedClient = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    this.userService.obtenerUsuarios('listar').subscribe(usuarios => {
      if (usuarios['success']) {
        this.clientsData = usuarios['mensaje'];
        this.clientsData.forEach(usuario => {
          const num = Math.floor(Math.random() * 12) + 1;
          usuario['foto'] = num + '.png';
        });
        this.update();
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log("Error listar ", error);
    })
  }

  filter(data) {
    const filter = this.filterValue.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }

  update() {
    const data = this.filter(this.clientsData);
    this.sort(data);
    this.dataSeeUsers = this.paginate(data);
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

}
