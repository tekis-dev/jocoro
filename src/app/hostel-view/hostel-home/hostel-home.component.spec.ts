import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelHomeComponent } from './hostel-home.component';

describe('HostelHomeComponent', () => {
  let component: HostelHomeComponent;
  let fixture: ComponentFixture<HostelHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
