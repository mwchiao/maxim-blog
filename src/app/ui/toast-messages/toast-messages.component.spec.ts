import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToastMessagesComponent } from './toast-messages.component';

describe('ToastMessagesComponent', () => {
  let component: ToastMessagesComponent;
  let fixture: ComponentFixture<ToastMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
