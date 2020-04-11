import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {
    this.appService.pageTitle = 'Inicia Sesión';
  }

  credentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  ngOnInit() {
  }

  signIn(){
    this.router.navigateByUrl('');
  }

}
