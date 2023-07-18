import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { adminOrder } from 'src/app/constants/models';
import { AdminorderService } from 'src/app/services/adminorder.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css'],
})
export class AdminorderComponent implements OnInit {
  orderItems = <any>[];

  // constructor
  constructor(
    private orderService: AdminorderService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  fetchOrders(): void {
    this.spinner.show();
    this.orderService.fetchData().subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner.hide();
        this.orderItems = res.orders;
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

  // fetching dishes on mount
  ngOnInit(): void {
    this.fetchOrders();
  }

  updateOrderStatus(order: adminOrder) {
    // console.log(order);
    this.spinner.show();
    this.orderService.updateOrder(order).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchOrders();
        this.spinner.hide();
        this.toast.success('<p>Order Updated Successfully</p>', '', {
          enableHtml: true,
        });
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
}
