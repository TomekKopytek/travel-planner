import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDialog } from './travel-dialog';

describe('TravelDialog', () => {
  let component: TravelDialog;
  let fixture: ComponentFixture<TravelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
