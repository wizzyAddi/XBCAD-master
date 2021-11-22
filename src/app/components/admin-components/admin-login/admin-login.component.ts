import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public adminAuthService: AdminAuthService, private router: Router) { }


  username: string;
  password: string;

  ngOnInit(): void {
  }


  OnSubmit(){

    //Fix user authenitcation using firebase auth
    // this.adminAuthService.AdminLogin(this.username, this.password).then(x => {
    //   console.log(x);
    // })

    // // if(istAuthenticated)
    // //   alert('User logged in')
    // // else
    // //   alert('User could not be logged in')

    // // console.log(istAuthenticated);

    if(this.username == "admin01" && this.password == "password01" ){

      this.router.navigate(['../admin-home']);

    }
    else{
      alert('Invalid credentials');
    }
  }
}
