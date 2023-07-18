import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { reviewMsg } from 'src/app/constants/models';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviewmodal',
  templateUrl: './reviewmodal.component.html',
  styleUrls: ['./reviewmodal.component.css'],
})
export class ReviewmodalComponent {
  orderId: number;
  dishId: number;
  reviewData: reviewMsg = {
    rating: 0,
    review_comment: '',
  };
  constructor(
    private reviewService: ReviewService,
    // modal configs
    public dialogRef: MatDialogRef<ReviewmodalComponent>,
    // inside data data is stored sent from the component from where model was triggered
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number; item_id: number }
  ) {
    this.orderId = data.orderId;
    this.dishId = data.item_id;
  }
  updateOrderRating(): void {
    this.reviewService
      .updateOrder(this.orderId, this.reviewData.rating)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addReview(): void {
    this.reviewService.postReview(this.dishId, this.reviewData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
