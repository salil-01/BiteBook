import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  selectedQuantities: { [dishId: string]: number | null } = {};
  menuItems = <any>[];

  constructor(private menuService: MenuService) {}
  // function to fetch Menu
  fetchMenu() {
    this.menuService.fetchData().subscribe({
      next: (res) => {
        this.menuItems = res;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // fetching menu on component mount
  ngOnInit(): void {
    this.fetchMenu();
  }
  // handling qunatity Change
  onQuantityChange(event: any, dishId: string) {
    const quantity = event?.target?.value || null;
    this.selectedQuantities[dishId] =
      quantity !== null ? parseInt(quantity, 10) : null;
  }

  // order placing
  placeOrder(dishId: number, quantity: number | null) {
    if (quantity !== null && quantity !== undefined) {
      this.menuService.postOrder(dishId, quantity).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      alert('Please select a quantity for the dish.');
    }
  }
}
