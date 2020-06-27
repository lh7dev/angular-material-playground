import { EventEmitter, Output } from '@angular/core';

import { EntityService } from './entity-service.class';
import { Entity, Contact } from './shared.interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { NextAction } from './entity-view.class';

export abstract class EntityDetails {

  entity: any;

  private loading: boolean = true;

  constructor(
    private service: EntityService,
    private ref: MatDialogRef<any>,
    public entityData: Entity
  ) {}

  refreshData(callback): void {
    this.service.getDetails({ id: this.entityData.id }).subscribe((result) => {
      if (result.success == true) {
        callback(result.data[0]);
      } else {
        this.service.notify('ERROR: could not reach the server');
        this.loading = false;
        this.ref.close();
      }
    });
  }

  dialogClose(): void {
    const next: NextAction = {
      next: null,
    };

    this.ref.close(next);
  }

  //public abstract editItem(): void; // ← close, then open edit component | trigger stub.

  openEdit(): void {
    const next: NextAction = {
      next: 'open-edit',
      entity: this.entity,
    };

    this.ref.close(next);
  }

  set isLoading(val) {
    this.loading = val;
  }

  get isLoading(): boolean {
    return this.loading;
  }
}
