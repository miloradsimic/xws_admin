import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Admin } from '../domain/admin';
import { LoginCredentials } from '../domain/login-credentials';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private authorization: string;
  private loggedAdmin: Admin;

  public attemptedUrl: string;

  constructor(private client: HttpClient) {
    this.authorization = null;
    this.loggedAdmin = null;
    this.attemptedUrl = null;
  }

  public login(credentials: LoginCredentials): Observable<boolean> {
    let loginService = this;
    return this.client.post<Admin>('/backend/auth/admin_login', credentials, {
      observe: "response"
    }).pipe<boolean>(map((adminResponse) => {
      loginService.loggedAdmin = adminResponse.body;
      loginService.authorization = adminResponse.headers.get("Authorization");
      return true;
    }));
  }

  public logout() {
    this.authorization = null;
    this.loggedAdmin = null;
    this.attemptedUrl = null;
  }

  public getLoggedAdmin(): Admin {
    return this.loggedAdmin;
  }

  public getAuthorizationHeader(): string {
    return this.authorization;
  }

  public isLoggedIn(): boolean {
    return this.loggedAdmin != null;
  }
}
