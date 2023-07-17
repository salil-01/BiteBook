import { Component, OnInit } from '@angular/core';
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
  constructor(
    private orderService: AdminorderService,
    private toast: ToastrService
  ) {}

  fetchOrders(): void {
    this.orderService.fetchData().subscribe({
      next: (res: any) => {
        console.log(res);
        this.orderItems = res.orders;
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
    this.fetchOrders();
  }

  updateOrderStatus(order: adminOrder) {
    console.log(order);
    this.orderService.updateOrder(order).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchOrders();
        this.toast.success('<p>Order Updated Successfully</p>', '', {
          enableHtml: true,
        });
      },
      error: (error) => {
        console.log(error);
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
    // this.orderService.updateOrderStatus(order.id, order.status).subscribe(() => {
    //   // Order status updated successfully
    //   // You can update the orders array or refresh the data from the server
    //   this.getOrders();
    // });
  }
}
