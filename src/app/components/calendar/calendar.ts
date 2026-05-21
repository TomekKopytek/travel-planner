import { Component, OnInit } from '@angular/core';
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
export class Calendar implements OnInit {

  calendarOptions!: CalendarOptions;

  ngOnInit(): void {

    this.calendarOptions = {
      events: [
        {
          title: 'Trip to Paris',
          start: '2026-05-18T10:00:00',
          end: '2026-05-18T12:00:00'
        },
        {
          title: 'Trip to Rome',
          start: '2026-05-20T14:00:00',
          end: '2026-05-20T16:00:00'
        }
      ],

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
    };

  }
  handleDateClick(info: any): void{
      alert('Clicked date:'+ info.dateStr);
  }
}