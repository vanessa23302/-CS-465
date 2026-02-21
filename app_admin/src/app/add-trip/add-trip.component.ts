import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  trip: Partial<Trip> = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };

  saving = false;
  errorMsg = '';

  constructor(private tripService: TripDataService, private router: Router) {}

  saveTrip(): void {
    this.saving = true;
    this.errorMsg = '';

    this.tripService.addTrip(this.trip).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Could not add trip.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/trips']);
  }
}