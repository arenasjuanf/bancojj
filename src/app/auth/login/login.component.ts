import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {
  fondo: any;
  constructor(private appService: AppService, private router: Router, private sanitizer: DomSanitizer) {
    this.appService.pageTitle = 'Inicia Sesión';
    this.fondo = this.setFondo();
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

  setFondo(){
    const num = Math.floor(Math.random() * 17);
    const fondo = `background-image: url('../assets/vendor/img/${num}.jpg');`;
    return this.sanitizer.bypassSecurityTrustStyle(fondo);
  }

}
