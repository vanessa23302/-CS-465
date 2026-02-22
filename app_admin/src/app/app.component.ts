import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripDataService } from './services/trip-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public tripService: TripDataService) {}

  logout(): void {
    this.tripService.logout();
    window.location.reload();
  }
}