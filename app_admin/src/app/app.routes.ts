import { Routes } from '@angular/router';

import { TripListComponent } from './trip-list/trip-list.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'add', component: AddTripComponent },
  { path: 'edit/:id', component: EditTripComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];