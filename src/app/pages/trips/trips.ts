import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trips',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './trips.html',

  styleUrl: './trips.css',
})
export class Trips {

  trips: any[] = [];

  ngOnInit(): void {

    const savedTrips =
      localStorage.getItem(
        'travelEvents'
      );

    if (savedTrips) {

      this.trips =
        JSON.parse(savedTrips);

    }

  }

}