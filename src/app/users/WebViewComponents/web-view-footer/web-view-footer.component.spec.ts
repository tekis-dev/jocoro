import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebViewFooterComponent } from './web-view-footer.component';

describe('WebViewFooterComponent', () => {
  let component: WebViewFooterComponent;
  let fixture: ComponentFixture<WebViewFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
