import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartDetails:ICart = {} as ICart 

  private readonly cartService = inject(CartService)
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateCount(id:string ,newCount:number ):void{
    this.cartService.updateCartQuantity(id ,newCount).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnInit(): void {
    this.getCartData()
  
  }

}
