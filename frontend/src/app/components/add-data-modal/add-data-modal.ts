import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sensex } from '../../services/sensex';
@Component({
  selector: 'app-add-data-modal',
  imports: [FormsModule],
  templateUrl: './add-data-modal.html',
  styleUrl: './add-data-modal.css'
})
export class AddDataModal {
  private sensexService = inject(Sensex);
  addDate: Date | null = null;
  addOpen: number | null = null;
  addClose: number | null = null;
  @Output() dataAdded = new EventEmitter<any>();
  @Output() modalClosure = new EventEmitter<any>();
  newData:{date:Date|null, open: number|null, close: number|null} = {
    date: null,
    open: null,
    close: null,
  }
  isModalOpen = true;

  closeModal() {
    this.isModalOpen = false;
    this.modalClosure.emit(this.isModalOpen);
    this.addDate = null;
    this.addOpen = null;
    this.addClose = null;
  }
  addNewData() {
    this.newData = {
      date: this.addDate,
      open: this.addOpen,
      close: this.addClose,
    };

    this.dataAdded.emit(this.newData);
    this.closeModal();
  }
}
