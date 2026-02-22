import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Trip {
  _id: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: number;
  image?: string;
  description?: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBase = 'http://localhost:3000/api';
  private tripsUrl = `${this.apiBase}/trips`;

  constructor(private http: HttpClient) {}

  /* ==========================
     AUTH HELPERS
     ========================== */

  private saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  getToken(): string {
    return localStorage.getItem('travlr-token') || '';
  }

  isLoggedIn(): boolean {
    return this.getToken().length > 0;
  }

  logout(): void {
    localStorage.removeItem('travlr-token');
  }

  register(name: string, email: string, password: string): Observable<void> {
    return this.http
      .post<AuthResponse>(`${this.apiBase}/register`, { name, email, password })
      .pipe(
        map((res) => {
          this.saveToken(res.token);
        })
      );
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<AuthResponse>(`${this.apiBase}/login`, { email, password })
      .pipe(
        map((res) => {
          this.saveToken(res.token);
        })
      );
  }

  /* ==========================
     TRIP API CALLS
     ========================== */

  // GET all trips (public)
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  // GET one trip (public)
  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${id}`);
  }

  // POST add trip (protected)
  addTrip(trip: Partial<Trip>): Observable<Trip> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.post<Trip>(this.tripsUrl, trip, { headers });
  }

  // PUT update trip (protected)
  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.put<Trip>(`${this.tripsUrl}/${id}`, trip, { headers });
  }

  // DELETE trip (protected)
  deleteTrip(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.delete<void>(`${this.tripsUrl}/${id}`, { headers });
  }
}