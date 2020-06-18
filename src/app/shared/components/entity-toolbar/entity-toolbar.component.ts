import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

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
