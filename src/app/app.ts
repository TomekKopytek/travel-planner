import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink, Router } from '@angular/router';

import { Calendar } from './components/calendar/calendar';
import { TravelDialog } from './components/travel-dialog/travel-dialog';

import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [
    Calendar,
    TravelDialog,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title =
    signal('travel-planner');

  events: any[] = [];

  showModal = false;

  selectedDate!: Date;

  editingEvent: any = null;

  editingEventId: string | null = null;

  constructor(
    private weather: Weather,
    public router: Router
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

          const temperature =
            response.current.temp_c;

          const updatedEvent = {

            id:
              this.editingEventId ||
              crypto.randomUUID(),

            title:
              `✈ ${trip.city}
               | 🌤 ${temperature}°C
               | 💰 ${trip.cost} PLN`,

            start: trip.startDate,

            end: trip.endDate,

            extendedProps: {

              country: trip.country,

              city: trip.city,

              cost: trip.cost,

              temperature: temperature

            }

          };

          // EDIT MODE

          if (this.editingEvent) {

            const filteredEvents =
              this.events.filter(
                event =>
                  event.id !==
                  this.editingEventId
              );

            this.events = [

              ...filteredEvents,

              updatedEvent

            ];

          }

          // CREATE MODE

          else {

            this.events = [

              ...this.events,

              updatedEvent

            ];

          }

          this.saveEvents();
          setTimeout(()=>{
            this.handleDialogClosed();
          })
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

    const savedEvents =
      localStorage.getItem(
        'travelEvents'
      );

    if (savedEvents) {

      this.events =
        JSON.parse(savedEvents);

    }

  }

  handleDateSelected(
    date: Date
  ): void {

    const now = new Date();

    if (date < now) {

      alert(
        'You cannot create trips in the past.'
      );

      return;

    }

    this.editingEvent = null;

    this.editingEventId = null;

    this.selectedDate = date;

    this.showModal = true;

  }

  handleEventDeleted(
    event: any
  ): void {

    this.editingEvent = event;

    this.editingEventId = event.id;

    this.showModal = true;

  }

  handleTripDeleted(): void {

    if (!this.editingEventId) {
      return;
    }

    this.events = this.events.filter(

      event =>
        event.id !==
        this.editingEventId

    );

    this.saveEvents();

    this.handleDialogClosed();

  }

  handleDialogClosed(): void {

    this.showModal = false;

    this.editingEvent = null;

    this.editingEventId = null;

    this.selectedDate = new Date();

  }
  isTripsPage(): boolean {

    return this.router.url === '/trips';

  }
}