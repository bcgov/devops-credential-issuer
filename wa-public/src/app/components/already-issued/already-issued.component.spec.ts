import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyIssuedComponent } from './already-issued.component';

describe('AlreadyIssuedComponent', () => {
  let component: AlreadyIssuedComponent;
  let fixture: ComponentFixture<AlreadyIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
