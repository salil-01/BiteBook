import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserorderService } from 'src/app/services/userorder.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css'],
})
export class UserorderComponent implements OnInit {
  orders = <any>[];

  constructor(
    private userOrderService: UserorderService,
    private toast: ToastrService
  ) {}

  // fetch order of a user
  fetchOrders(): void {
    this.userOrderService.fetchData().subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res.orders;
      },
      error: (error) => {
        console.log(error);
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }

  // fetching data on mount
  ngOnInit() {
    this.fetchOrders();
  }

  addReview(orderId: number, status: string) {
    if (status !== 'Delievered') {
      this.toast.error(
        '<p>Please wait until your order get delievered...</p>',
        '',
        {
          enableHtml: true,
        }
      );
      return;
    }
    console.log(orderId);
  }
}
