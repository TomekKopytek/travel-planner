import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-travel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './travel-dialog.html',
  styleUrls: ['./travel-dialog.css']
})
export class TravelDialog {
  @Output() tripAdded = new EventEmitter<any>();
  travelForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.travelForm = this.fb.group({

      country: ['', Validators.required],

      city: ['', Validators.required],

      cost: ['', Validators.required]

    });

  }

  submit(): void {

    if(this.travelForm.invalid) {
      return;
    }
    this.tripAdded.emit(this.travelForm.value);
    this.travelForm.reset();

  }

}