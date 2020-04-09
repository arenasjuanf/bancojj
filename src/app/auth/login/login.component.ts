import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Inicia Sesion';
  }

  credentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  ngOnInit() {
  }

}
