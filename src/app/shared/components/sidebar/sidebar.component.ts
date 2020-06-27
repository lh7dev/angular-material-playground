import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navigation = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  onNavigation(){
    this.navigation.emit();
  }

}
