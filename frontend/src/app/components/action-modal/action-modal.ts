import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Sensex } from '../../services/sensex';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-action-modal',
  imports: [FormsModule, DatePipe],
  templateUrl: './action-modal.html',
  styleUrl: './action-modal.css'
})
export class ActionModal implements OnInit{
  private sensexService = inject(Sensex);
  private datepipe = inject(DatePipe);
  updateDate: Date | null = null;
  updateOpen: number | null = null;
  updateClose: number | null = null;
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() actionModalClosure = new EventEmitter<any>();

  @Input() data : any = {};
  
  ngOnInit(): void {
    this.updateDate = new Date(this.data.date);
    this.updateOpen = this.data.open;
    this.updateClose = this.data.close;
  }

  newData:{_id:any,date:Date|null, open: number|null, close: number|null} = {
    _id: null,
    date: null,
    open: null,
    close: null,
  }
  isModalOpen = true;

  closeActionModal() {
    this.isModalOpen = false;
    this.actionModalClosure.emit(this.isModalOpen);
    this.updateDate = null;
    this.updateOpen = null;
    this.updateClose = null;
  }

  onDateChange(dateString: string) {
    this.updateDate = new Date(dateString);
  }

  updateData() {
    this.newData = {
      _id: this.data._id,
      date: this.updateDate,
      open: this.updateOpen,
      close: this.updateClose,
    };

    this.dataUpdated.emit(this.newData);
    this.closeActionModal();
  }
}
