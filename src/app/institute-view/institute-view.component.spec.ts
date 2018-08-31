import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstituteViewComponent } from './institute-view.component';

describe('InstituteViewComponent', () => {
  let component: InstituteViewComponent;
  let fixture: ComponentFixture<InstituteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
