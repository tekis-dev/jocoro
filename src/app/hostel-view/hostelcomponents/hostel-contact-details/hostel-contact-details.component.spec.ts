import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelContactDetailsComponent } from './hostel-contact-details.component';

describe('HostelContactDetailsComponent', () => {
  let component: HostelContactDetailsComponent;
  let fixture: ComponentFixture<HostelContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
