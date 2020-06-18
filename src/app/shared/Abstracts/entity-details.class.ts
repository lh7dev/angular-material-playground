import { EventEmitter, Output } from "@angular/core";

import { EntityService } from './entity-service.class';
import { Entity, Contact } from './shared.interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { NextAction } from './entity-view.class';

export abstract class EntityDetails {
  abstract detailsComponent: any;

  entity = null;

  constructor(
    private service: EntityService,
    private ref: MatDialogRef<any>,
    public entityData: Entity
  ) {
  }

  setEntity(entity:Entity) {
    this.service.getDetails({_id: this.entityData._id}).subscribe(
      result=>{
        if(result.success == true){
          this.entity = result.data[0];
        } else {
          this.service.notify("ERROR: could not reach the server");
          this.ref.close();
        }
      }
    )
  }

  dialogClose(): void {
    const next: NextAction = {
      next: null
    };

    this.ref.close(next);
  }

  //public abstract editItem(): void; // ← close, then open edit component | trigger stub.

  openEdit(): void {

    const next: NextAction = {
      next: "open-edit",
      entity: this.entity
    };

    this.ref.close(next);
  }
}
