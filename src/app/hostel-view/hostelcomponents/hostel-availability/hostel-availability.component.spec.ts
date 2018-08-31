import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAvailabilityComponent } from './hostel-availability.component';

describe('HostelAvailabilityComponent', () => {
  let component: HostelAvailabilityComponent;
  let fixture: ComponentFixture<HostelAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
