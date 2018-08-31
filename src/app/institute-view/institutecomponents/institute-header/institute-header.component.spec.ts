import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteViewHeaderComponent } from './institute-header.component';

describe('ViewHeaderComponent', () => {
  let component: InstituteViewHeaderComponent;
  let fixture: ComponentFixture<InstituteViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
