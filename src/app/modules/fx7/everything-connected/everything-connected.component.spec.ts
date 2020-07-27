import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverythingConnectedComponent } from './everything-connected.component';

describe('EverythingConnectedComponent', () => {
  let component: EverythingConnectedComponent;
  let fixture: ComponentFixture<EverythingConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverythingConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverythingConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
