import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css'
})
export class DeleteModal {
  // @Input() data : any = {};
  
  @Output() dataDeleted = new EventEmitter<any>();
  @Output() deleteModalClosure = new EventEmitter<any>();

  deleteData() {
    this.dataDeleted.emit(true);
    this.deleteClosure();
  }

  deleteClosure() {
    this.deleteModalClosure.emit(false);
  }
}
