import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewStateService } from 'src/app/shared/services/view-state.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private viewState: ViewStateService
  ) {}

  ngOnInit(): void {}

  resizeElements(e) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  toggleDrawer() {
    this.viewState.IsMenuOpen = !this.viewState.IsMenuOpen;
  }

  get ViewStateService() {
    return this.viewState;
  }

  autoClose(drawer) {
    console.log(drawer);
    this.isHandset$.subscribe(r => {
      if (r) {
        drawer.close();
      }
    });
  }
}
