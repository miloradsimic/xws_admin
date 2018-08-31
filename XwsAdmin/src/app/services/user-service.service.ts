import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private client: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.client.get<User[]>("/backend/user/users") ;
  }

  public blockUser(user: User): Observable<boolean> {
    return this.client.put<void>(`/backend/user/user/${user.id}/false`, null, {
      observe: "response"
    }).pipe(map(voidResponse => {
      return false;
    }));
  }

  public activateUser(user: User): Observable<boolean> {
    return this.client.put<void>(`/backend/user/user/${user.id}/true`, null, {
      observe: "response"
    }).pipe(map(voidResponse => {
      return true;
    }));
  }

  public deleteUser(user: User) {
    return this.client.delete<void>(`/backend/user/user/${user.id}`, {
      observe: "response"
    }).pipe(map(voidResponse => {
      return true;
    }));
  }
}
