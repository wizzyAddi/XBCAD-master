import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakeBookingComponent } from './components/make-booking/make-booking.component';
import { AdminEventsComponent } from './components/admin-components/admin-events/admin-events.component';
import { AdminNavComponent } from './components/navbars/admin-nav/admin-nav.component';
import { NavbarComponent } from './components/navbars/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { EventService } from './services/event.service';
import { BookingService } from './services/booking.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { CountdownClockComponent } from './components/make-booking/countdown-clock/countdown-clock.component';
import { AdminLoginComponent } from './components/admin-components/admin-login/admin-login.component';
import { AdminAuthService } from './services/admin-auth.service';
import { PerformerRequestsComponent } from './components/admin-components/performer-requests/performer-requests.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminReportsComponent } from './components/admin-components/admin-reports/admin-reports.component';
import { AdminMenuComponent } from './components/admin-components/admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MakeBookingComponent,
    AdminEventsComponent,
    AdminNavComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    AdminHomeComponent,
    CountdownClockComponent,
    AdminLoginComponent,
    PerformerRequestsComponent,
    ContactComponent,
    AdminReportsComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [EventService, BookingService, AdminAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
