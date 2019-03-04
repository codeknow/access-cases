import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// modules
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

// AngularFire
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
//

// environment
import {environment} from '../environments/environment';

// components
import {AppComponent} from './app.component';
import {LandingComponent} from './pages/landing/landing.component';

import {SpeakersComponent} from './pages/speakers/speakers.component';
import {SpeakerEditComponent} from './pages/speakers/speaker-edit/speaker-edit.component';
import {SpeakerItemComponent} from './pages/speakers/speaker-item/speaker-item.component';

import {SessionsComponent} from './pages/sessions/sessions.component';
import {SessionEditComponent} from './pages/sessions/session-edit/session-edit.component';
import {SessionItemComponent} from './pages/sessions/session-item/session-item.component';

import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

import {AdminComponent} from './auth/admin/admin.component';
import {LoginComponent} from './auth/login/login.component';

// partials
import {TopBarComponent} from './partials/navigation/top-bar/top-bar.component';
import {TabsTitleComponent} from './partials/navigation/tabs-title/tabs-title.component';
import {ButtonGroupComponent} from './partials/navigation/button-group/button-group.component';

// services
import {SpeakerService} from './pages/speakers/speaker.service';
import {SessionService} from './pages/sessions/session.service';
import {DataModelService} from './services/data-model.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';

// libs
import {FilterPipeModule} from 'ngx-filter-pipe';

@NgModule({
  declarations: [
    AppComponent,

    LandingComponent,

    SpeakersComponent,
    SpeakerEditComponent,
    SpeakerItemComponent,

    SessionsComponent,
    SessionEditComponent,
    SessionItemComponent,

    TopBarComponent,
    TabsTitleComponent,
    ButtonGroupComponent,

    PageNotFoundComponent,

    AdminComponent,

    LoginComponent,

  ],
  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,

    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    FilterPipeModule
  ],
  providers: [SpeakerService, SessionService, DataModelService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
