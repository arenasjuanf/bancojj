import { Component, OnInit, HostBinding } from '@angular/core';
import { AdministradorService } from 'src/app/shared/services/administrador.service';
import { FormBuilder } from '@angular/forms';
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
  formulario: any;

  constructor(private adminService: AdministradorService, private formBuilder: FormBuilder, private sppiner: NgxSpinnerService,) {
    this.initForm();
    this.getUsers();
  }

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
  arrayCuentas ;

  getUsers() {
    this.adminService.listarUsuarios().subscribe(
      result => {
        console.log('resultadini: ', result);
        if (result['mensaje']) {
          this.clientsData = result['mensaje'];
        }
      },
      error => {
        console.log('errorsini: ', error);
      }
    )
  }


  selectClient(client) {
    this.selectedClient = client;
    this.sideboxOpened = true;
    this.getCuentas();
  }

  getCuentas(){
    this.sppiner.show();
    this.adminService.getUserAccounts(this.selectedClient['id']).subscribe(
      result => {
        console.log('result get acc- ', result);
        if (result['success']){
          this.arrayCuentas = result['mensaje'];
        }
        this.sppiner.hide();
      }, error => {
        console.log('error: ', error);
      }
    )
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }

  ngOnInit(): void { }

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

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: '',
      clave: '',
      saldo: 100000,
      tipoCuenta: '',
      idUsuario: '',
      estado: ''
    });
  }

  guardar(){
    this.formulario.get('idUsuario').setValue(this.selectedClient['id']);
    this.formulario.get('tipoCuenta').setValue(1);
    this.formulario.get('estado').setValue(1);
    console.log(this.formulario.value);

    this.adminService.crearCuenta(this.formulario.value).subscribe(
      result => {
        console.log('result  crear cuenta: ', result);
        if(result['success']){
          this.formulario.reset();
        }
      }, error => {
        console.log('error crear cuenta: ', error);
      }
    )
  }

}
