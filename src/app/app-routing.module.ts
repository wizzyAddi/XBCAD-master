import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminEventsComponent } from './components/admin-components/admin-events/admin-events.component';
import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-components/admin-login/admin-login.component';
import { PerformerRequestsComponent } from './components/admin-components/performer-requests/performer-requests.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MakeBookingComponent } from './components/make-booking/make-booking.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminMenuComponent } from './components/admin-components/admin-menu/admin-menu.component';
import { AdminReportsComponent } from './components/admin-components/admin-reports/admin-reports.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'event', component: MakeBookingComponent },
  {path: 'menu', component: MenuComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'admin-event', component: AdminEventsComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-requests', component: PerformerRequestsComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'admin-reports', component: AdminReportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
