import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  selectedQuantities: { [dishId: string]: number | null } = {};
  menuItems = <any>[
    {
      id: 1,
      name: 'Pizza',
      price: 100,
      stock: 10,
      reviews: [
        {
          email: 'sldkal',
          rating: 3,
          review_comment: 'sdfsff',
        },
        {
          email: 'sadaldfsfsfkal',
          rating: 3,
          review_comment: 'sddsdsfsff',
        },
      ],
    },
    {
      id: 2,
      name: 'Burger',
      price: 100,
      stock: 10,
      reviews: [
        {
          email: 'kd@mail',
          rating: 3,
          review_comment: 'sdfsff',
        },
        {
          email: 'ck@mail',
          rating: 3,
          review_comment: 'sddsdsfsff',
        },
      ],
    },
    {
      id: 3,
      name: 'Pepsi',
      price: 100,
      stock: 10,
      reviews: [
        {
          email: 'kd@mail',
          rating: 3,
          review_comment: 'sdfsff',
        },
        {
          email: 'ck@mail',
          rating: 3,
          review_comment: 'sddsdsfsff',
        },
      ],
    },
    {
      id: 4,
      name: 'Kola',
      price: 100,
      stock: 10,
      reviews: [
        {
          email: 'kd@mail',
          rating: 3,
          review_comment: 'sdfsff',
        },
        {
          email: 'ck@mail',
          rating: 3,
          review_comment: 'sddsdsfsff',
        },
      ],
    },
    {
      id: 5,
      name: 'Fries',
      price: 100,
      stock: 10,
      reviews: [
        {
          email: 'kd@mail',
          rating: 3,
          review_comment: 'sdfsff',
        },
        {
          email: 'ck@mail',
          rating: 3,
          review_comment: 'sddsdsfsff',
        },
      ],
    },
  ];

  onQuantityChange(event: any, dishId: string) {
    const quantity = event?.target?.value || null;
    this.selectedQuantities[dishId] =
      quantity !== null ? parseInt(quantity, 10) : null;
  }

  placeOrder(dishId: string, quantity: any) {
    if (quantity !== null && quantity !== undefined) {
      console.log(
        `Placing order for dish with ID ${dishId} with quantity ${quantity}`
      );
    } else {
      alert('Please select a quantity for the dish.');
    }
  }
}
