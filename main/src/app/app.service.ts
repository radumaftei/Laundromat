import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Machine, Location } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api';

  getMachines() {
    return this.httpClient.get<Machine[]>(`${this.apiUrl}/machines`);
  }

  getLocations() {
    return this.httpClient.get<Location[]>(`${this.apiUrl}/locations`);
  }
}
