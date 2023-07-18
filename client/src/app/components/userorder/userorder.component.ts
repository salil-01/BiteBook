import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserorderService } from 'src/app/services/userorder.service';
import { ReviewmodalComponent } from '../reviewmodal/reviewmodal.component';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css'],
})
export class UserorderComponent implements OnInit {
  orders = <any>[];

  constructor(
    private userOrderService: UserorderService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  // fetch order of a user
  fetchOrders(): void {
    this.spinner.show();
    this.userOrderService.fetchData().subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res.orders;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }

  // fetching data on mount
  ngOnInit() {
    this.fetchOrders();
    // listening to even emitted when a new review  is added and  rating has been changed
    this.userOrderService.data$.subscribe(() => {
      this.fetchOrders();
    });
  }

  addReview(orderId: number, status: string, rating: number, item_id: number) {
    if (status !== 'Delievered') {
      this.toast.info(
        '<p>Please wait until your order get delievered...</p>',
        '',
        {
          enableHtml: true,
        }
      );
      return;
    }
    if (rating !== 0) {
      this.toast.info('<p>Review already Submitted</p>', '', {
        enableHtml: true,
      });
      return;
    }
    // console.log(orderId);
    this.dialog.open(ReviewmodalComponent, {
      width: '400px',
      data: { orderId, item_id },
    });
  }
}
