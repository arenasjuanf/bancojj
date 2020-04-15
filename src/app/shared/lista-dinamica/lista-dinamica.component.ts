import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-dinamica',
  templateUrl: './lista-dinamica.component.html',
  styleUrls: ['./lista-dinamica.component.scss']
})
export class ListaDinamicaComponent implements OnInit {

  @Input() keysFilter: Array<string>;//searchKeys = ['id', 'account', 'email', 'name']; Columnas a filtrar
  @Input() propertiesForm: Array<string>;
  @Input() propertiesTable: Array<string>;
  @Input() dataRenderizer: Array<string>;//datos de la consulta
  @Input() title: string;
  formFilter: FormGroup;
  isRTL: boolean;
  objeto = {
    hola: '00000'
  }

  constructor(private formBuilder: FormBuilder) {
    this.loadData();
  }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formFilter = this.formBuilder.group({});
    this.propertiesForm.forEach(property => {
      this.formFilter.addControl(property, new FormControl('', { validators: Validators.required }));
    });
  }

  // Options
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: object[] = [];
  originalUsersData: object[] = [];

  loadData() {
    this.originalUsersData = [
      {
        "id": 3507,
        "account": "gmay",
        "email": "gmay@mail.com",
        "name": "Goldie May",
        "latestActivity": "05/23/2018",
        "role": 1,
        "status": 1
      },
      {
        "id": 3508,
        "account": "hballard",
        "email": "hballard@mail.com",
        "name": "Harper Ballard",
        "latestActivity": "03/28/2018",
        "role": 3,
        "status": 1
      },
      {
        "id": 3509,
        "account": "sguzman",
        "email": "sguzman@mail.com",
        "name": "Stevens Guzman",
        "latestActivity": "05/04/2018",
        "role": 3,
        "status": 3
      },
      {
        "id": 3542,
        "account": "mstokes",
        "email": "mstokes@mail.com",
        "name": "Mercer Stokes",
        "latestActivity": "04/27/2018",
        "role": 4,
        "status": 1
      },
      {
        "id": 3543,
        "account": "lbarber",
        "email": "lbarber@mail.com",
        "name": "Lily Barber",
        "latestActivity": "04/29/2018",
        "role": 1,
        "status": 2
      },
      {
        "id": 3544,
        "account": "mbenjamin",
        "email": "mbenjamin@mail.com",
        "name": "Morse Benjamin",
        "latestActivity": "03/19/2018",
        "role": 2,
        "status": 2
      },
      {
        "id": 3545,
        "account": "ngay",
        "email": "ngay@mail.com",
        "name": "Nixon Gay",
        "latestActivity": "05/31/2018",
        "role": 3,
        "status": 2
      },
      {
        "id": 3546,
        "account": "shenderson",
        "email": "shenderson@mail.com",
        "name": "Sweeney Henderson",
        "latestActivity": "07/10/2018",
        "role": 4,
        "status": 2
      },
      {
        "id": 3547,
        "account": "etanner",
        "email": "etanner@mail.com",
        "name": "Edna Tanner",
        "latestActivity": "06/22/2018",
        "role": 4,
        "status": 3
      },
      {
        "id": 3548,
        "account": "kstrickland",
        "email": "kstrickland@mail.com",
        "name": "Kaye Strickland",
        "latestActivity": "04/28/2018",
        "role": 3,
        "status": 1
      },
      {
        "id": 3549,
        "account": "tcruz",
        "email": "tcruz@mail.com",
        "name": "Taylor Cruz",
        "latestActivity": "07/14/2018",
        "role": 2,
        "status": 1
      },
      {
        "id": 3550,
        "account": "mlivingston",
        "email": "mlivingston@mail.com",
        "name": "Mullins Livingston",
        "latestActivity": "04/17/2018",
        "role": 4,
        "status": 2
      },
      {
        "id": 3551,
        "account": "frichard",
        "email": "frichard@mail.com",
        "name": "Fitzgerald Richard",
        "latestActivity": "03/17/2018",
        "role": 2,
        "status": 2
      },
      {
        "id": 3552,
        "account": "cduffy",
        "email": "cduffy@mail.com",
        "name": "Cain Duffy",
        "latestActivity": "07/08/2018",
        "role": 3,
        "status": 1
      },
      {
        "id": 3553,
        "account": "fgrimes",
        "email": "fgrimes@mail.com",
        "name": "Frazier Grimes",
        "latestActivity": "03/21/2018",
        "role": 2,
        "status": 3
      },
      {
        "id": 3554,
        "account": "wreed",
        "email": "wreed@mail.com",
        "name": "Ward Reed",
        "latestActivity": "04/23/2018",
        "role": 3,
        "status": 3
      },
      {
        "id": 3555,
        "account": "lmontoya",
        "email": "lmontoya@mail.com",
        "name": "Latonya Montoya",
        "latestActivity": "04/22/2018",
        "role": 4,
        "status": 3
      },
      {
        "id": 3556,
        "account": "sgilmore",
        "email": "sgilmore@mail.com",
        "name": "Small Gilmore",
        "latestActivity": "07/25/2018",
        "role": 1,
        "status": 3
      }
    ];
    this.update();
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalUsersData);

    this.totalItems = data.length;

    this.sort(data);
    this.usersData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.keysFilter.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
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
    console.log("Fomrulario ", this.formFilter.value);
  }

}
