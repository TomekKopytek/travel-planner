import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private apiKey = 'f8bcf716644b4f5ca19185129262205';
  private baseUrl = 'https://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(
      `${this.baseUrl}?key=${this.apiKey}&q=${city}`
    );
  }
}
