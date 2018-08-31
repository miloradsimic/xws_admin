import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgentComponent } from './agent/agent.component';
import { UserComponent } from './user/user.component';
import { NavigationParentComponent } from './navigation-parent/navigation-parent.component';
import { NewCommentsComponent } from './new-comments/new-comments.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/newComments'},
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavigationParentComponent, 
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: 'newComments', component: NewCommentsComponent },
      { path: 'agents', component: AgentComponent },
      { path: 'users', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
