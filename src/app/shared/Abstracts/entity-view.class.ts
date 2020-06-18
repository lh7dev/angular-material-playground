import { Component } from '@angular/core';
import { iEntityListView, Entity } from './shared.interfaces';
import { MatDialog } from '@angular/material/dialog';

export abstract class EntityView {

  constructor(private matDialog: MatDialog){}

  abstract title: string;

  abstract dialogNew: any;

  abstract dialogDelete: any;

  abstract dialogDetails: any;

  abstract dialogEdit: any;

  checkedItems: Entity[] = [];

  abstract listRef: iEntityListView;

  abstract onNew():void;

  abstract onDelete();

  abstract onSelect(e:Entity);

  onOpenEdit(e: Entity) {
    const dialogRef = this.matDialog.open(this.dialogEdit, {
      width: '400px',
      autoFocus: false,
      data: e,
    });

    dialogRef.afterClosed().subscribe((result: NextAction) => {
      console.log(result);
      switch (result.next) {
        case 'open-details':
          this.onSelect(result.entity);
          break;
        default:
          this.listRef.refreshList();
          break;
      }
    });
  }

  onSelectionChanged(event) {
    this.checkedItems = event;
  }

  entityRefText(singular:string,plural:string){
    let count = this.checkedItems.length;
    const x = count > 1 ? plural : singular;
    return x;
  }
}


export interface NextAction {
  next?: string;
  entity?: Entity;
}
