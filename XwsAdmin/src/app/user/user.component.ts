import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private selectedUser: User;
  private users: User[];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    let component = this;
    this.selectedUser = null;
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        component.users = users;
      },
      (error: any) => {
        alert("Server returned error: " + JSON.stringify(error));
      });
  }

  activateUser() {
    const component = this;
    if(this.selectedUser != null) {
      this.userService.activateUser(this.selectedUser).subscribe(
        (newActiveState) => {
          component.selectedUser.active = newActiveState;
        },
        (error) => {
          alert("Remote error! Server response: " + JSON.stringify(error));
        }
      );
    }
  }

  blockUser() {
    const component = this;
    if(this.selectedUser != null) {
      this.userService.blockUser(this.selectedUser).subscribe(
        (newActiveState) => {
          component.selectedUser.active = newActiveState;
        },
        (error) => {
          alert("Remote error! Server response: " + JSON.stringify(error));
        }
      );
    }
  }

  deleteUser() {
    if(this.selectedUser != null) {
      let index = this.users.indexOf(this.selectedUser);
      this.userService.deleteUser(this.selectedUser);
      this.users.splice(index, 1);
      let length = this.users.length;
      if(length > 0) {
        if(index < 0) {
          this.selectedUser = this.users[0];
        }
        else if(index >= length) {
          this.selectedUser = this.users[length - 1]
        }
        else {
          this.selectedUser = this.users[index]
        }
      }
      else {
        this.selectedUser = null;
      }
    }
  }
}
