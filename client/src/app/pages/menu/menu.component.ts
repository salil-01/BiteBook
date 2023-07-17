import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  selectedQuantities: { [dishId: string]: number | null } = {};
  menuItems = <any>[];
  dis = true;
  constructor(
    private menuService: MenuService,
    private toast: ToastrService,
    public authService: AuthService
  ) {
    // console.log(this.authService.auth);
  }
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
      if (this.authService.auth) {
        this.menuService.postOrder(dishId, quantity).subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success('<p>Order Placed Successfully</p>', '', {
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
      } else {
        this.toast.error('<p>Login to Place Order</p>', '', {
          enableHtml: true,
        });
      }
    } else {
      this.toast.info('<p>Please Select Quantity</p>', '', {
        enableHtml: true,
      });
    }
  }
}
