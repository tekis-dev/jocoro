import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteModuleComponent } from './institute-module.component';

describe('InstituteModuleComponent', () => {
  let component: InstituteModuleComponent;
  let fixture: ComponentFixture<InstituteModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
