import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { reviewMsg } from 'src/app/constants/models';
import { ReviewService } from 'src/app/services/review.service';
import { UserorderService } from 'src/app/services/userorder.service';

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
    private userOrderService: UserorderService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    // modal configs
    public dialogRef: MatDialogRef<ReviewmodalComponent>,
    // inside data data is stored sent from the component from where model was triggered
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number; item_id: number }
  ) {
    this.orderId = data.orderId;
    this.dishId = data.item_id;
  }
  updateOrderRating(): void {
    this.spinner.show();
    this.reviewService
      .updateOrder(this.orderId, this.reviewData.rating)
      .subscribe({
        next: (res) => {
          console.log(res);
          // triggering even to get updated order of user after adding rating and review
          this.userOrderService.notifyDataChange();
          this.spinner.hide();
          this.toast.success('<p>Review Added Successfully</p>', '', {
            enableHtml: true,
          });
          this.closeModal();
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        },
      });
  }

  addReview(): void {
    if (
      this.reviewData.rating < 0 ||
      this.reviewData.rating > 5 ||
      this.reviewData.review_comment === ''
    ) {
      this.toast.info('<p>Invalid Input Data</p>', '', {
        enableHtml: true,
      });
      return;
    }
    this.spinner.show();
    this.reviewService.postReview(this.dishId, this.reviewData).subscribe({
      next: (res) => {
        console.log(res);
        this.updateOrderRating();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
  closeModal(): void {
    // Close the modal without making any changes
    this.dialogRef.close();
  }
}
