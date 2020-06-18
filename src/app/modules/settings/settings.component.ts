import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  business = _business_;
  constructor() { }

  ngOnInit(): void {
  }

}

const _business_ = {
  name: "Mambi Software LLC",
  address: {
    address_line_1: "2565 Tedford Dr.",
    address_line_2: "STE 45-B",
    city: "Whittier",
    state: "CA",
    zipcode: "90354"
  }
}
