import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  currentTab: string = 'inventory';

  showInventory() {
    this.currentTab = 'inventory';
  }

  showOrders() {
    this.currentTab = 'orders';
  }
}
