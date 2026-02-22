import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {

  errorMsg = '';

  trip: Partial<Trip> = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: 0
  };

  constructor(private tripService: TripDataService, private router: Router) {}

  onSubmit(): void {
    this.errorMsg = '';

    this.tripService.addTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Add trip failed', err);
        this.errorMsg = 'Could not add trip. Make sure you are logged in.';
      }
    });
  }
}