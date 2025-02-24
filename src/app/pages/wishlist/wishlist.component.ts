import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlistItems : IWishlist[] =[]

  private readonly wishlistService = inject(WishlistService)
 private readonly toastrService = inject(ToastrService)
 private readonly cartService = inject(CartService)


  getWishlistData():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistItems = res.data
        
      }
    })
  }
  removeFromWishlist(id:string):void{
    this.wishlistService.deleteProductFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);

        
      }
    })
  }
  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        
        this.toastrService.success(res.message,'Fresh Cart')

      }
    })

  }

  ngOnInit(): void {
    this.getWishlistData()
  }
}
