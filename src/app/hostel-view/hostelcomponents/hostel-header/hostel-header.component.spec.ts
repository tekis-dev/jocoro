import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelHeaderComponent } from './hostel-header.component';

describe('HostelHeaderComponent', () => {
  let component: HostelHeaderComponent;
  let fixture: ComponentFixture<HostelHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
