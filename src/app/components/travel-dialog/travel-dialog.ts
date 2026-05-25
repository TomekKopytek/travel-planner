import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

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
export class TravelDialog implements OnChanges {
  @Output() tripAdded = new EventEmitter<any>();
  @Input() selectedDate!: Date;
  travelForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.travelForm = this.fb.group({

      country: ['', [Validators.required, Validators.minLength(2)]],

      city: ['', [Validators.required, Validators.minLength(2)]],

      cost: ['', [Validators.required, Validators.min(1)]],

      startDate: ['', Validators.required],

      endDate: ['', Validators.required]

    });
    this.setMinDate();

  }
  validateDates(): boolean {
    const startDate = new Date(this.travelForm.value.startDate);
    const endDate = new Date(this.travelForm.value.endDate);
    return endDate>startDate;
  }

  formatDate(date: Date): string {

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');

  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;

  }
  minDate='';
  submitted = false;
  setMinDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month=String(now.getMonth()+1).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    const hours =String(now.getHours()).padStart(2,'0');
    const minutes =String(now.getMinutes()).padStart(2,'0');
    this.minDate=`${year}-${month}-${day}T${hours}:${minutes}`;
  }

  submit(): void {
    this.submitted = true;
    if(this.travelForm.invalid||!this.validateDates()) {
      return;
    }
    this.tripAdded.emit(this.travelForm.value);
    this.submitted = false;
    this.travelForm.reset();

  }
  ngOnChanges(changes: SimpleChanges): void {

  if (changes['selectedDate'] && this.selectedDate) {

    const formattedDate = this.formatDate(this.selectedDate);

    this.travelForm.patchValue({
      startDate: formattedDate
    });

  }
  
  }
}