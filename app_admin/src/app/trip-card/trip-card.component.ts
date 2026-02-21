import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  @Input() trip!: Trip;

  constructor(private tripDataService: TripDataService) {}

  deleteTrip(): void {
    if (!this.trip?._id) return;

    const confirmDelete = confirm(
      `Delete trip "${this.trip.name}"?`
    );

    if (confirmDelete) {
      this.tripDataService.deleteTrip(this.trip._id).subscribe({
        next: () => {
          console.log('Trip deleted');
          // simple refresh so list updates
          window.location.reload();
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }
}