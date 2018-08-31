import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelFooterComponent } from './hostel-footer.component';

describe('HostelFooterComponent', () => {
  let component: HostelFooterComponent;
  let fixture: ComponentFixture<HostelFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
