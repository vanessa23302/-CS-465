import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-list.component.html'
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  isLoading = true;
  loadError = '';

  constructor(public tripService: TripDataService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
      },
      error: () => {
        this.loadError = 'Could not load trips.';
        this.isLoading = false;
      }
    });
  }
}