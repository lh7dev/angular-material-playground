import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../Abstracts/shared.interfaces';

@Component({
  selector: 'app-address-format',
  templateUrl: './address-format.component.html',
  styleUrls: ['./address-format.component.scss'],
})
export class AddressFormatComponent implements OnInit {
  @Input() address: Address | null;
  constructor() {}

  ngOnInit(): void {}
}
