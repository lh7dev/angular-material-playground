import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryNewComponent } from './inventory-new.component';

describe('InventoryNewComponent', () => {
  let component: InventoryNewComponent;
  let fixture: ComponentFixture<InventoryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
