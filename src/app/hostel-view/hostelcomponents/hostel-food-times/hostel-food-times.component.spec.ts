import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelFoodTimesComponent } from './hostel-food-times.component';

describe('HostelFoodTimesComponent', () => {
  let component: HostelFoodTimesComponent;
  let fixture: ComponentFixture<HostelFoodTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelFoodTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelFoodTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
