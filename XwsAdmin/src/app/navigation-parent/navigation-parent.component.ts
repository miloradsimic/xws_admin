import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { Admin } from '../domain/admin';

@Component({
  selector: 'app-navigation-parent',
  templateUrl: './navigation-parent.component.html',
  styleUrls: ['./navigation-parent.component.css']
})
export class NavigationParentComponent implements OnInit {

  public loggedAdmin: Admin;

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.loggedAdmin = null;
    if(this.loginService.isLoggedIn()) {
      this.loggedAdmin = this.loginService.getLoggedAdmin();
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }

}
