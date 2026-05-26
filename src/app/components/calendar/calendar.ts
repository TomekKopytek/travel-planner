import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class Calendar implements OnInit, OnChanges {
  @Input() events: any[]=[];
  @Output() dateSelected = new EventEmitter<any>();
  @Output() eventDeleted = new EventEmitter<any>();

  calendarOptions!: CalendarOptions;

  ngOnInit(): void {

    this.calendarOptions = {
      events: this.events,

      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ],
      height: 'auto',
      nowIndicator: true,
      editable: true,
      selectable: true,
      initialView: 'timeGridWeek',

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      weekends: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['events'] && this.calendarOptions) {
      this.calendarOptions.events = this.events;
    }
  }
  handleDateClick(info: any): void{
      this.dateSelected.emit(info.date);
  }
  handleEventClick(info:any): void {
      this.eventDeleted.emit(info.event);
  }
}