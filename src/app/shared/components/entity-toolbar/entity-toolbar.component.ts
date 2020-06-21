import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-toolbar',
  templateUrl: './entity-toolbar.component.html',
  styleUrls: ['./entity-toolbar.component.scss']
})
export class EntityToolbarComponent implements OnInit {

  @Input() title: string | null;
  @Input() showNewBtn: boolean = false;
  @Input() showDeleteBtn: boolean = false;
  @Input() showSearchBar: boolean = false;

  @Output() newEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() searchChanged = new EventEmitter<string>();

  isHandset$: Observable<boolean> = this.bpo.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private bpo:BreakpointObserver) { }

  ngOnInit(): void {
  }

  onNew() {
    this.newEvent.emit();
  }

  onDelete() {
    this.deleteEvent.emit();
  }

  onSearchChaged(value) {
    let x = value.trim().toLowerCase()
    this.searchChanged.emit(x);
  }
}
