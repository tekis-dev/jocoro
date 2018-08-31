import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelFoodComponent } from './hostel-food.component';

describe('HostelFoodComponent', () => {
  let component: HostelFoodComponent;
  let fixture: ComponentFixture<HostelFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
