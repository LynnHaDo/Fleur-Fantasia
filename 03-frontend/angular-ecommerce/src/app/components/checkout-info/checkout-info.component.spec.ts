import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutInfoComponent } from './checkout-info.component';

describe('CheckoutInfoComponent', () => {
  let component: CheckoutInfoComponent;
  let fixture: ComponentFixture<CheckoutInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
