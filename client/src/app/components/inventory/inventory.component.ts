import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { dishInventory } from 'src/app/constants/models';
import { MatDialog } from '@angular/material/dialog';
import { EditmodalComponent } from '../editmodal/editmodal.component';
import { InventoryService } from 'src/app/services/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;

  inventoryItems = <any>[];
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private inventoryService: InventoryService,
    private toast: ToastrService
  ) {}

  fetchDishes(): void {
    this.inventoryService.fetchData().subscribe({
      next: (res) => {
        console.log(res);
        this.inventoryItems = res;
      },
      error: (error) => {
        console.log(error);
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }
  // fetching dishes on mount
  ngOnInit(): void {
    this.fetchDishes();
  }

  ngAfterViewInit() {
    // Trigger the event after the component's view has been initialized
    this.inventoryService.myEvent.subscribe(() => {
      this.fetchDishes();
    });
  }
  editDish(dish: dishInventory): void {
    this.dialog.open(EditmodalComponent, {
      width: '400px',
      data: { dish },
    });
  }
  // listening to even emitted

  deleteDish(dishId: number): void {
    console.log(dishId);

    this.inventoryService.deleteData(dishId).subscribe({
      next: (response: any) => {
        console.log(response);

        this.fetchDishes();
        this.toast.success('<p>Dish Deleted Successfully</p>', '', {
          enableHtml: true,
        });
      },
      error: (error: any) => {
        console.error('Error deleting dish:', error);
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }
}
