import { Component } from '@angular/core';
import { addDishItem } from 'src/app/constants/models';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.css'],
})
export class AddmodalComponent {
  item: addDishItem = {
    name: '',
    price: '',
    stock: '',
    availability: '',
  };

  // constructor
  constructor(
    public dialogRef: MatDialogRef<AddmodalComponent>,
    private toast: ToastrService,
    private inventoryService: InventoryService
  ) {}

  // functionality
  addDish() {
    if (
      this.item.name &&
      this.item.price &&
      this.item.stock &&
      this.item.availability
    ) {
      this.inventoryService.addData(this.item).subscribe({
        next: (res) => {
          console.log(res);
          this.inventoryService.notifyDataChange();
          this.toast.success('<p>Dish Added Successfully</p>', '', {
            enableHtml: true,
          });
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
          this.toast.error('<p>Server Error</p>', '', {
            enableHtml: true,
          });
        },
      });
    } else {
      this.toast.info('<p>Please Fill All the Fields</p>', '', {
        enableHtml: true,
      });
    }
  }
  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
