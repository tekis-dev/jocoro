import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelFacilitiesComponent } from './hostel-facilities.component';

describe('HostelFacilitiesComponent', () => {
  let component: HostelFacilitiesComponent;
  let fixture: ComponentFixture<HostelFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
