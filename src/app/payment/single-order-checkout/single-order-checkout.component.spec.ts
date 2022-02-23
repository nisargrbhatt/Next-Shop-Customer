import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderCheckoutComponent } from './single-order-checkout.component';

describe('SingleOrderCheckoutComponent', () => {
  let component: SingleOrderCheckoutComponent;
  let fixture: ComponentFixture<SingleOrderCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleOrderCheckoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOrderCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
