import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  _id: string;
  code: string;
  name: string;
  length: string;
  start: string;          // keep as string for forms; backend can store Date
  resort: string;
  perPerson: number;      // <-- change to number (matches your Mongo/POST tests)
  image?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  // GET one trip
  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }

  // POST add trip
  addTrip(trip: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip);
  }

  // PUT update trip
  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/${id}`, trip);
  }

  // DELETE trip
  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}