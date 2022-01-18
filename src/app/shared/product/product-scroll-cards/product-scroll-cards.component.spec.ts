import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScrollCardsComponent } from './product-scroll-cards.component';

describe('ProductScrollCardsComponent', () => {
  let component: ProductScrollCardsComponent;
  let fixture: ComponentFixture<ProductScrollCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductScrollCardsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScrollCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
