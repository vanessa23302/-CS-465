import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterLink],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  loadError = '';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.loadError =
          'Could not load trips. Make sure the API is running at http://localhost:3000 and try again.';
        this.isLoading = false;
      }
    });
  }
}