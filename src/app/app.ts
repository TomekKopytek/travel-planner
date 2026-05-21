import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calendar } from './components/calendar/calendar';
import { TravelDialog } from './components/travel-dialog/travel-dialog';

@Component({
  selector: 'app-root',
  imports: [Calendar, TravelDialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('travel-planner');
  events: any[] = [];
  showModal = false;
  handleTripAdded(trip: any): void {

  const endDate = new Date(this.selectedDate);

  endDate.setHours(endDate.getHours() + 1);

  const newEvent = {

    title: `${trip.city} - ${trip.cost} PLN`,

    start: this.selectedDate,

    end: endDate

  };

  this.events = [...this.events, newEvent];
  this.showModal = false;
}
  selectedDate!:Date;
  handleDateSelected(date: Date): void {
    
    this.selectedDate = date;

    this.showModal = true;

    console.log(this.selectedDate);
  }
  
}

