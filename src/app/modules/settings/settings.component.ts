import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/services/business.service';
import { Business } from 'src/app/shared/Abstracts/business.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  business: Business | null;

  constructor(private service: BusinessService) {}

  ngOnInit(): void {
    this.service.businessInfo().subscribe((result) => {
      if (result.success) {
        this.business = result.data;
      }
    });
  }
}
