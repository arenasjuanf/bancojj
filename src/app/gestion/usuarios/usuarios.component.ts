import { Component, OnInit, HostBinding } from '@angular/core';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
    '../../../vendor/styles/pages/clients.scss',
    './usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UsuariosService) { }

  @HostBinding('class') hostClasses = 'd-flex flex-grow-1 align-items-stretch h-100';

  selectedClient: object = {};
  sideboxOpened = false;
  clientsData: Array<object> = [];

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
    this.userService.obtenerUsuarios('listar').subscribe(usuarios => {
      if (usuarios['success']) {
        this.clientsData = usuarios['mensaje'];
        this.clientsData.forEach(usuario => {
          const num = Math.floor(Math.random() * 12);
          usuario['foto'] = num + '.png';
        });
      }
    }, error => {
      console.log("Error listar ", error);
    })
  }

}
