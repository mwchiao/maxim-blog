import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedoorComponent } from './sidedoor.component';

describe('SidedoorComponent', () => {
  let component: SidedoorComponent;
  let fixture: ComponentFixture<SidedoorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidedoorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
