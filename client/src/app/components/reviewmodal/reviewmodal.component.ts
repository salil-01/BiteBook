import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { reviewMsg } from 'src/app/constants/models';

@Component({
  selector: 'app-reviewmodal',
  templateUrl: './reviewmodal.component.html',
  styleUrls: ['./reviewmodal.component.css'],
})
export class ReviewmodalComponent {
  orderId: number;
  reviewData: reviewMsg = {
    rating: 0,
    review_comment: '',
  };
  constructor(
    // modal configs
    public dialogRef: MatDialogRef<ReviewmodalComponent>,
    // inside data data is stored sent from the component from where model was triggered
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.orderId = data.orderId;
  }
}
