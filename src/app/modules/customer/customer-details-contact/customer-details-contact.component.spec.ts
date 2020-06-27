import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsContactComponent } from './customer-details-contact.component';

describe('CustomerDetailsContactComponent', () => {
  let component: CustomerDetailsContactComponent;
  let fixture: ComponentFixture<CustomerDetailsContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
