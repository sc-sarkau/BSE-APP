import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Sensex } from '../../services/sensex';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddDataModal } from '../add-data-modal/add-data-modal';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { ActionModal } from '../action-modal/action-modal';
import { DeleteModal } from '../delete-modal/delete-modal';
import { AverageCalculator } from '../../services/average-calculator';
import { AverageGraph } from '../average-graph/average-graph';
import { SocketService } from '../../services/socket-service';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'app-sensex-list',
  imports: [
    NgFor,
    FormsModule,
    AddDataModal,
    NgIf,
    CommonModule,
    ActionModal,
    DeleteModal,
    AverageGraph,
  ],
  templateUrl: './sensex-list.html',
  styleUrl: './sensex-list.css',
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
  constructor(
    private router: Router,
    private socketService: SocketService,
    private ngZone: NgZone
  ) {}
  private sensexService = inject(Sensex);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(Auth);
  private averageCalculator = inject(AverageCalculator);
  private notification = inject(NotificationService);
  tempCurrentPage: number = 1;
  highlightedId: any;
  ngOnInit() {
    console.log(localStorage.getItem('jwtToken'));
    if (localStorage.getItem('jwtToken') == null) {
      this.router.navigate(['/']);
    }
    this.loadData(1);

    this.socketService.listen('data-added').subscribe((newData) => {
      this.ngZone.run(() => {
        this.sensexData.unshift(newData);
        this.loadData(1);
      });
    });

    this.socketService.listen('data-updated').subscribe((updatedData) => {
      this.ngZone.run(() => {
        const index = this.sensexData.findIndex(
          (d) => d._id === updatedData._id
        );
        if (index !== -1) this.sensexData[index] = updatedData;
        this.loadData(1);
      });
    });

    this.socketService.listen('data-deleted').subscribe((deletedData) => {
      this.ngZone.run(() => {
        this.sensexData = this.sensexData.filter(
          (d) => d._id !== deletedData._id
        );
        this.loadData(1);
      });
    });
    this.cdr.detectChanges();
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
  /**
   * Loads Data in Table
   * @param pageNumber
   */
  loadData(pageNumber: number) {
    this.sensexService.getAll().subscribe((data) => {
      this.sensexData = data;
      this.currentPage = pageNumber;
      this.paginate();
      this.cdr.detectChanges();
    });
  }

  /**
   * Highlights data after addition
   * @param id
   */
  loadDataAndHighlight(id: string) {
    this.sensexService.getAll().subscribe((data) => {
      this.sensexData = data;

      const index = this.sensexData.findIndex((item) => item._id === id);
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
          }, 3000);
        } else {
          console.log('element not found');
        }
      }, 100);
    });
  }

  /**
   * Segregates Table Data into multiple pages
   */
  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.sensexData.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.sensexData.length) {
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
  /**
   * Adds Data
   * @param newData
   */
  addNewData(newData: any) {
    this.sensexService.addData(newData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length != 0) {
          this.notification.showSuccess('Added Data Successfully');
          console.log(res);
          this.highlightedId = res._id;
          this.ngZone.run(() => this.loadDataAndHighlight(res._id));
          this.cdr.detectChanges();
        } else {
          this.notification.showWarning(res.message);
        }
      },
      error: (err) => {
        this.notification.showError(
          err.error?.message || 'Something went wrong'
        );
      },
    });
  }
  /**
   * Updates Data
   * @param updatedData
   */
  updateData(updatedData: any) {
    this.sensexService.updateData(updatedData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length != 0) {
          this.notification.showSuccess('Updated Successfully');
          this.loadData(this.currentPage);
          this.cdr.detectChanges();
        } else {
          this.notification.showWarning(res.message);
        }
      },
      error: (err) => {
        this.notification.showError(
          err.error?.message || 'Something went wrong'
        );
      },
    });
  }

  /**
   * Deletes Data
   * @param flag
   */
  deleteData(flag: boolean) {
    console.log(this.dataToDelete);
    this.sensexService.deleteData(this.dataToDelete).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length != 0) {
          this.notification.showSuccess('Deleted Successfully');
          this.loadData(this.currentPage);
          this.cdr.detectChanges();
        } else {
          this.notification.showWarning(res.message);
        }
      },
      error: (err) => {
        this.notification.showError(
          err.error?.message || 'Something went wrong'
        );
      },
    });
    this.isDeleteOpen = false;
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
