import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { dishInventory } from 'src/app/constants/models';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryComponent } from '../inventory/inventory.component';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css'],
})
export class EditmodalComponent {
  @ViewChild(InventoryComponent)
  sourceComponent!: InventoryComponent;
  editedDish: dishInventory;
  constructor(
    private inventoryService: InventoryService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dish: dishInventory }
  ) {
    this.editedDish = { ...data.dish }; // Create a copy of the original dish object
  }
  updateDish(): void {
    this.inventoryService.updateData(this.editedDish).subscribe({
      next: (res) => {
        console.log(res);
        this.inventoryService.triggerEvent();
        this.toast.success('<p>Dish Updated Successfully</p>', '', {
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
  }

  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
