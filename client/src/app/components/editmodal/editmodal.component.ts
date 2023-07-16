import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dishInventory } from 'src/app/constants/models';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css'],
})
export class EditmodalComponent {
  editedDish: dishInventory;
  constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dish: dishInventory }
  ) {
    this.editedDish = { ...data.dish }; // Create a copy of the original dish object
  }

  updateDish(): void {
    console.log('edited');

    // this.dishService.updateDish(this.editedDish).subscribe(
    //   () => {
    //     // Patch request successful
    //     this.dialogRef.close();
    //   },
    //   (error) => {
    //     // Handle error if patch request fails
    //   }
    // );
  }

  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
