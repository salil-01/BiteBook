import { Component } from '@angular/core';
import { adminOrder } from 'src/app/constants/models';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css'],
})
export class AdminorderComponent {
  orderItems: adminOrder[] = [
    {
      id: 1,
      name: 'Pizza',
      price: 100,
      status: 'Received',
      rating: 4,
    },
    {
      id: 2,
      name: 'Burger',
      price: 100,
      status: 'Received',
      rating: 4,
    },
    {
      id: 3,
      name: 'Pepsi',
      price: 100,
      status: 'Received',
      rating: 4,
    },
    {
      id: 4,
      name: 'Kola',
      price: 100,
      status: 'Received',
      rating: 4,
    },
    {
      id: 5,
      name: 'Fries',
      price: 100,
      status: 'Received',
      rating: 4,
    },
  ];
  updateOrderStatus(order: adminOrder) {
    console.log(order);
    // this.orderService.updateOrderStatus(order.id, order.status).subscribe(() => {
    //   // Order status updated successfully
    //   // You can update the orders array or refresh the data from the server
    //   this.getOrders();
    // });
  }
}
