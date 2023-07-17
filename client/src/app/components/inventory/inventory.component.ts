import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { dishInventory } from 'src/app/constants/models';
import { MatDialog } from '@angular/material/dialog';
import { EditmodalComponent } from '../editmodal/editmodal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  isLoading: boolean = false;

  inventoryItems = <any>[
    {
      id: 1,
      name: 'Pizza',
      price: 100,
      stock: 10,
      availability: 'Yes',
    },
    {
      id: 2,
      name: 'Burger',
      price: 100,
      stock: 10,
      availability: 'Yes',
    },
    {
      id: 3,
      name: 'Pepsi',
      price: 100,
      stock: 10,
      availability: 'Yes',
    },
    {
      id: 4,
      name: 'Kola',
      price: 100,
      stock: 10,
      availability: 'Yes',
    },
    {
      id: 5,
      name: 'Fries',
      price: 100,
      stock: 10,
      availability: 'Yes',
    },
  ];
  constructor(private dialog: MatDialog, private spinner: NgxSpinnerService) {}
  showSpinner(): void {
    this.spinner.show();
  }

  hideSpinner(): void {
    this.spinner.hide();
  }
  fetchData(): void {
    this.isLoading = true;
    this.showSpinner();
  }
  ngOnInit(): void {
    // this.fetchData();
  }
  // constructor(private dishService: DishService) { }

  // ngOnInit() {
  //   this.fetchDishes();
  // }

  // fetchDishes() {
  //   this.dishService.getDishes().subscribe(
  //     (response: any) => {
  //       this.dishes = response.dishes;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching dishes:', error);
  //     }
  //   );
  // }
  editDish(dish: dishInventory): void {
    this.dialog.open(EditmodalComponent, {
      width: '400px',
      data: { dish },
    });
  }

  deleteDish(dishId: string) {
    console.log(dishId);

    // this.dishService.deleteDish(dishId).subscribe(
    //   (response: any) => {
    //     console.log('Dish deleted successfully');
    //     // Update the dish list by fetching the updated dishes
    //     this.fetchDishes();
    //   },
    //   (error: any) => {
    //     console.error('Error deleting dish:', error);
    //   }
    // );
  }
}
