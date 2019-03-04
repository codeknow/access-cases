import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SpeakersComponent} from './pages/speakers/speakers.component';
import {SessionsComponent} from './pages/sessions/sessions.component';

import {SpeakerEditComponent} from './pages/speakers/speaker-edit/speaker-edit.component';
import {SessionEditComponent} from './pages/sessions/session-edit/session-edit.component';

import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AdminComponent} from './auth/admin/admin.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth-guard.service';


const appRoutes: Routes = [

  // 404
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'speakers', component: SpeakersComponent, children: [
      {path: 'build', component: SpeakerEditComponent},
      {path: ':id/edit', component: SpeakerEditComponent}
    ], canActivate: [AuthGuard]
  },

  {
    path: 'sessions', component: SessionsComponent, children: [
      {path: 'build', component: SessionEditComponent},
      {path: ':id/edit', component: SessionEditComponent}
    ], canActivate: [AuthGuard]

  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: AdminComponent},


  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
