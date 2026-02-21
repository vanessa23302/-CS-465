import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'edit/:id', component: EditTripComponent },
  { path: 'add', component: AddTripComponent },
];
