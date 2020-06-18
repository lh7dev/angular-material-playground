import { Component, OnInit, Input, Inject } from '@angular/core';
import { Entity, Cancelable } from '../../Abstracts/shared.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityService } from '../../Abstracts/entity-service.class';

@Component({
  selector: 'app-delete-view',
  templateUrl: './delete-view.component.html',
  styleUrls: ['./delete-view.component.scss'],
})
export class DeleteViewComponent implements OnInit, Cancelable {
  message = '';
  private itemCount: number | null;
  private entityName: string | null;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: iDeleteData
  ) {}

  ngOnInit(): void {
    let data = this.data;
    console.log(data);

    this.message = `You are about to permanently delete ${this.data.count} ${this.data.entityRefText}. Do you want to proceed?`;
    console.log(this.message);
  }

  cancel() {
    this.dialogRef.close({ userConfirmed: false });
  }

  confirm() {
    this.dialogRef.close({ userConfirmed: true });
  }

  get ItemCount() {
    return this.itemCount;
  }

  get EntityName() {
    return this.entityName;
  }
}

export interface iDeleteData {
  entityRefText: string;
  count: number;
}

export interface iDeleteChoice {
  userConfirmed: boolean;
}

