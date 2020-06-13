import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';

import { HeaderComponent } from './header.component';
import { MatToolbar } from '@angular/material/toolbar';


let loader: HarnessLoader;
let rootLoader: HarnessLoader;

beforeEach(async () => {
  TestBed.configureTestingModule({
    declarations: [HeaderComponent],
    imports: [],
  });

  const fixture = TestBed.createComponent(HeaderComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);
});


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
