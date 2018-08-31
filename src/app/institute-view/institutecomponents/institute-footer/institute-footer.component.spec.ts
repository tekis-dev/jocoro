import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteViewFooterComponent } from './institute-footer.component';

describe('ViewFooterComponent', () => {
  let component: InstituteViewFooterComponent;
  let fixture: ComponentFixture<InstituteViewFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteViewFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
