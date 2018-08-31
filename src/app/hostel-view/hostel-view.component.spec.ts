import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostelViewComponent } from './hostel-view.component';

describe('HostelViewComponent', () => {
  let component: HostelViewComponent;
  let fixture: ComponentFixture<HostelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
