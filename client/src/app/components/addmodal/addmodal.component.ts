import { Component } from '@angular/core';
import { addDishItem } from 'src/app/constants/models';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(public dialogRef: MatDialogRef<AddmodalComponent>) {}
  submitForm() {
    if (
      this.item.name &&
      this.item.price &&
      this.item.price &&
      this.item.availability
    ) {
      console.log(this.item);
    } else {
      console.log('Please fill in all fields.');
    }
  }
  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
