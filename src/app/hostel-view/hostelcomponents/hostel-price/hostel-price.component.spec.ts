import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelPriceComponent } from './hostel-price.component';

describe('HostelPriceComponent', () => {
  let component: HostelPriceComponent;
  let fixture: ComponentFixture<HostelPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
