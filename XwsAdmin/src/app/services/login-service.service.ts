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

  public static USER_KEY: string = "user";
  public static AUTHORIZATION_KEY: string = "authorization";

  public attemptedUrl: string;

  constructor(private client: HttpClient) {
    this.attemptedUrl = null;
  }

  public login(credentials: LoginCredentials): Observable<boolean> {
    let loginService = this;
    return this.client.post<Admin>('/backend/auth/admin_login', credentials, {
      observe: "response"
    }).pipe<boolean>(map((adminResponse) => {
      sessionStorage.setItem(LoginServiceService.USER_KEY, JSON.stringify(adminResponse.body));
      sessionStorage.setItem(LoginServiceService.AUTHORIZATION_KEY, adminResponse.headers.get("Authorization"));
      return true;
    }));
  }

  public logout() {
    sessionStorage.removeItem(LoginServiceService.USER_KEY);
    sessionStorage.removeItem(LoginServiceService.AUTHORIZATION_KEY);
    this.attemptedUrl = null;
  }

  public getLoggedAdmin(): Admin {
    return JSON.parse(sessionStorage.getItem(LoginServiceService.USER_KEY)) as Admin;
  }

  public getAuthorizationHeader(): string {
    return sessionStorage.getItem(LoginServiceService.AUTHORIZATION_KEY);
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(LoginServiceService.USER_KEY) != null;
  }
}
