import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Sensex } from '../../services/sensex';
import { CommonModule, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddDataModal } from '../add-data-modal/add-data-modal';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { ActionModal } from '../action-modal/action-modal';
import { DeleteModal } from '../delete-modal/delete-modal';
import { AverageCalculator } from '../../services/average-calculator';
import { AverageGraph } from '../average-graph/average-graph';
@Component({
  selector: 'app-sensex-list',
  imports: [NgFor, FormsModule, AddDataModal, NgIf, CommonModule, ActionModal, DeleteModal, AverageGraph],
  templateUrl: './sensex-list.html',
  styleUrl: './sensex-list.css'
})
export class SensexList implements OnInit {
  sensexData: any[] = [];
  dataToUpdate: any;
  dataToDelete: any;
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  addDate: Date | null = null;
  addOpen: number | null = null;
  addClose: number | null = null;
  isModalOpen: boolean = false;
  isActionOpen: boolean = false;
  isDeleteOpen: boolean = false;
  backButtonFlag: any;
  constructor(private router: Router) {}
  private sensexService = inject(Sensex);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(Auth);
  private averageCalculator = inject(AverageCalculator)
  tempCurrentPage: number = 1;
  highlightedId: any;
  ngOnInit() {
    this.loadData(1);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(flag: boolean) {
    this.isModalOpen = flag;
  }

  closeActionModal(flag: boolean) {
    this.isActionOpen = flag;
  }

  closeDeleteModal(flag: boolean) {
    this.isDeleteOpen = flag;
  }

  loadData(pageNumber: number) {
    this.sensexService.getAll().subscribe(data => {
      this.sensexData = data;
      this.currentPage = pageNumber;
      this.paginate();
      this.cdr.detectChanges();
      // console.log(this.sensexData);
      // console.log(this.averageCalculator.calculateMonthlyAverage(this.sensexData));
    })
  }

  loadDataAndHighlight(id: string) {
    this.sensexService.getAll().subscribe(data => {
      this.sensexData = data;
      
      const index = this.sensexData.findIndex(item => item._id === id);
      if (index === -1) return;

      const page = Math.floor(index / this.itemsPerPage) + 1;
      this.currentPage = page;
      this.paginate();

      this.cdr.detectChanges();

      setTimeout(() => {
        const element = document.getElementById(`entry-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight');

          setTimeout(() => {
            element.classList.remove('highlight');
          }, 2000);
        }
        else{
          console.log("element not found");
        }
      }, 100)
    });
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.sensexData.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.sensexData.length) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  addNewData(newData: any) {
    
    this.sensexService.addData(newData).subscribe(data =>{
      // this.loadData(1);
      console.log(data);
      this.highlightedId = data._id;
      this.loadDataAndHighlight(data._id);
      // console.log(this.sensexData);
    });
    // this.addDate = "";
    // this.addOpen = null;
    // this.addClose = null;
  }
  updateData(updatedData: any) {
    this.sensexService.updateData(updatedData).subscribe(data =>{
      // this.tempCurrentPage = this.currentPage;
      this.loadData(this.currentPage);
      // this.paginate();
      // console.log(this.sensexData);
    });
    // this.addDate = "";
    // this.addOpen = null;
    // this.addClose = null;
  }

  deleteData(flag: boolean) {
    console.log(this.dataToDelete);
    this.sensexService.deleteData(this.dataToDelete).subscribe(data =>{
      this.loadData(this.currentPage);
      // console.log(this.sensexData);
    });
    this.isDeleteOpen = false;
    // this.addDate = "";
    // this.addOpen = null;
    // this.addClose = null;
  }

  onLogout() {
    this.authService.logout();
  }

  handleAction(item: any): void {
    console.log('Action clicked for:', item._id);
    this.dataToUpdate = item;
    this.isActionOpen = true;
    
  }
  handleDelete(item: any): void {
    console.log('Delete clicked for:', item);
    this.dataToDelete = item;
    this.isDeleteOpen = true;
  }

  toGraph() {
    this.backButtonFlag = true;
    this.router.navigate(['/graph']);
  }
}
