import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.component.html'
})
export class TripCardComponent {

  @Input() trip!: Trip;

  constructor(public tripService: TripDataService) {}

  deleteTrip(): void {

    if (!this.trip?._id) return;

    const confirmDelete = confirm(`Delete trip "${this.trip.name}"?`);
    if (!confirmDelete) return;

    this.tripService.deleteTrip(this.trip._id).subscribe({
      next: () => window.location.reload(),
      error: (err) => console.error('Delete failed', err)
    });
  }
}