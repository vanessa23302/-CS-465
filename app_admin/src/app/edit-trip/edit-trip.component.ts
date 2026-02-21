// src/app/edit-trip/edit-trip.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripDataService, Trip } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  tripId = '';
  trip: Trip | null = null;

  saving = false;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // Your routes use: edit/:id
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading = false;
      this.errorMsg = 'No trip id in the URL.';
      return;
    }

    this.tripId = id;
    this.loadTrip();
  }

  loadTrip(): void {
    this.loading = true;
    this.errorMsg = '';

    this.tripService.getTrip(this.tripId).subscribe({
      next: (data: Trip) => {
        // Convert ISO date -> YYYY-MM-DD for <input type="date">
        const start = data.start ? data.start.toString().slice(0, 10) : '';

        this.trip = {
          ...data,
          start
        };

        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading trip:', err);
        this.errorMsg =
          'Could not load trip. Make sure the API is running and the id is valid.';
        this.loading = false;
      }
    });
  }

  saveTrip(): void {
    if (!this.trip) return;

    this.saving = true;
    this.errorMsg = '';

    // Send only editable fields (avoid sending _id back)
    const payload: Partial<Trip> = {
      code: this.trip.code,
      name: this.trip.name,
      length: this.trip.length,
      start: this.trip.start,
      resort: this.trip.resort,
      perPerson: this.trip.perPerson,
      image: this.trip.image,
      description: this.trip.description
    };

    console.log('Save clicked:', this.tripId, payload);

    this.tripService.updateTrip(this.tripId, payload).subscribe({
      next: (updated: Trip) => {
        console.log('Saved OK:', updated);
        this.saving = false;
        // Go back to list after saving
        this.router.navigate(['/trips']);
      },
      error: (err: any) => {
        console.error('Save FAILED:', err);
        this.errorMsg =
          'Save failed. Check console and confirm PUT /api/trips/:tripid works.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/trips']);
  }
}