import { Component, OnInit, HostBinding } from '@angular/core';
import { AdministradorService } from 'src/app/shared/services/administrador.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
    '../../../vendor/styles/pages/clients.scss',
    './usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor( private adminService: AdministradorService) {
    this.getUsers();  
  }

  @HostBinding('class') hostClasses = 'd-flex flex-grow-1 align-items-stretch h-100';

  selected: any = null;
  sideboxOpened = false;

  clientsData = [{
    avatar: '5-small.png',
    name: 'Nelle Maxwell',
    username: 'nmaxwell',
    email: 'nmaxwell@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.'
  }, {
    avatar: '9-small.png',
    name: 'Amanda Warner',
    username: 'awarner',
    email: 'awarner@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 1,
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }, {
    avatar: '4-small.png',
    name: 'Kenneth Frazier',
    username: 'kfrazier',
    email: 'kfrazier@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 3,
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }, {
    avatar: '6-small.png',
    name: 'Mae Gibson',
    username: 'mgibson',
    email: 'mgibson@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.'
  }, {
    avatar: '12-small.png',
    name: 'Arthur Duncan',
    username: 'aduncan',
    email: 'aduncan@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 2
  }, {
    avatar: '11-small.png',
    name: 'Belle Ross',
    username: 'bross',
    email: 'bross@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }, {
    avatar: '3-small.png',
    name: 'Allie Rodriguez',
    username: 'arodriguez',
    email: 'bross@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 1,
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }, {
    avatar: '7-small.png',
    name: 'Alice Hampton',
    username: 'ahampton',
    email: 'ahampton@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 3,
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }, {
    avatar: '8-small.png',
    name: 'Hallie Lewis',
    username: 'hlewis',
    email: 'hlewis@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    status: 2
  }, {
    avatar: '2-small.png',
    name: 'Leon Wilson',
    username: 'lwilson',
    email: 'lwilson@mail.com',
    phone: '+0 (123) 456 7891',
    company: 'Company Inc.',
    messages: [
      { content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.', date: '1 day' },
      { content: 'Vivendum torquatos ut nec, sit audiam deterruisset ei, cu sed nibh autem scriptorem. Ea quo vidit deleniti constituto, ex qui malis mollis iudicabit, viris fabellas id has.', date: '2 days' },
      { content: 'Eam facilis laboramus reprehendunt ei, ex esse fastidii per.', date: '3 days' },
      { content: 'Ea inani epicurei mea. No docendi antiopam quo, ad dicant viderer cotidieque vix. Ea mea dicat ludus, utroque explicari conclusionemque ius eu, in scaevola tractatos persecuti per.', date: '3 days' }
    ]
  }];


  arrayCuentas = [
    {
      content: 'cuenta 1',
      date: '$100.000'
    },
    {
      content: 'cuenta 2',
      date: '$450.000'
    }
  ]

  getUsers(){
    this.adminService.listarUsuarios().subscribe(
      result => {
        console.log('resultadini: ', result);
        if(result['mensaje']){
          this.clientsData = result['mensaje'];
        }
      },
      error => {
        console.log('errorsini: ', error);
      }
    )
  }


  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }

  ngOnInit(): void {
  }

}
