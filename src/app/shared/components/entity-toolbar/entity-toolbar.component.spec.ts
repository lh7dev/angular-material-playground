import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityToolbarComponent } from './entity-toolbar.component';

describe('EntityToolbarComponent', () => {
  let component: EntityToolbarComponent;
  let fixture: ComponentFixture<EntityToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
