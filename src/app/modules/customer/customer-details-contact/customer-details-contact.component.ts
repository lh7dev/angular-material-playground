import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/shared/Abstracts/shared.interfaces';

@Component({
  selector: 'app-customer-details-contact',
  templateUrl: './customer-details-contact.component.html',
  styleUrls: ['./customer-details-contact.component.scss']
})
export class CustomerDetailsContactComponent implements OnInit {

  @Input() contacts: Contact[] | null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.contacts)
  }

}
