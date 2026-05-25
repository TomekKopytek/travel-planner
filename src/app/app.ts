import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Calendar } from './components/calendar/calendar';
import { TravelDialog } from './components/travel-dialog/travel-dialog';

import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [
    Calendar,
    TravelDialog
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('travel-planner');

  events: any[] = [];

  showModal = false;

  selectedDate!: Date;

  constructor(
    private weather: Weather
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  testWeather(): void {

    this.weather.getWeather('Tokyo')
      .subscribe({

        next: (response) => {

          console.log(response);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  handleTripAdded(trip: any): void {

    this.weather.getWeather(trip.city)
      .subscribe({

        next: (response: any) => {

          const temperature = response.current.temp_c;

          const condition = response.current.condition.text;

          const newEvent = {

            title:
              `✈ ${trip.city} | ${temperature}°C`,

            start: trip.startDate,

            end: trip.endDate

          };

          this.events = [...this.events, newEvent];

          this.saveEvents();

          this.showModal = false;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }
  saveEvents(): void {
    localStorage.setItem(
      'travelEvents',

      JSON.stringify(this.events)
    );
  }
  loadEvents(): void {
    const savedEvents = localStorage.getItem('travelEvents');

    if(savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }

  handleDateSelected(date: Date): void {

    const now = new Date();

    if (date < now) {

      alert('You cannot create trips in the past.');

      return;

    }

    this.selectedDate = date;

    this.showModal = true;

  }
  handleEventDeleted(event: any): void{
    this.events = this.events.filter(
      e=>e.title!==event.title
    );
    this.saveEvents();
  }
}