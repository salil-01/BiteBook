import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddmodalComponent } from 'src/app/components/addmodal/addmodal.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  currentTab: string = 'inventory';
  constructor(private dialog: MatDialog) {}

  addDish(): void {
    this.dialog.open(AddmodalComponent, {
      width: '400px',
    });
  }
  showInventory() {
    this.currentTab = 'inventory';
  }

  showOrders() {
    this.currentTab = 'orders';
  }
}
