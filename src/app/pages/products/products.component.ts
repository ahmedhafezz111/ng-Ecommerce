import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../shared/pipes/termtext/termtext.pipe';

@Component({
  selector: 'app-products',
  imports: [FormsModule,RouterLink,SearchPipe ,CurrencyPipe ,TermtextPipe,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
 private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
  
    wishlistItems : IWishlist[] = []
    text:String = ""
  
    products:IProduct[]=[]

  getProductsData():void{
    this.productsService.getAllProudcts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
     })
  }

  addCartItem(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message,'Fresh Cart')
        this.cartService.cartNumber.set(res.numOfCartItems) 
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addToWishlist(id: string, event: Event): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res && res.data) {
          const updatedWishlist = res.data.map((item: any) => item._id);
          this.wishlistItems = Array.from(new Set([...this.wishlistItems, ...updatedWishlist]));
          this.wishlistService.wishListNum.next(this.wishlistItems.length);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
          this.addColor(event)

        }
        this.toastrService.success(res.message, 'FreshCart');
      }
    });
  }
  
  
  getLoggedUserWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.wishlistItems = res.data.map((item: any) => item._id); 
          this.wishlistService.wishListNum.next(this.wishlistItems.length);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems)); 
        }
        
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }
 
  addColor(event:Event):void{
    const icon = (event.target as HTMLElement).closest('button')?.querySelector('i');
    if(localStorage.getItem('wishlist') !== null){
     icon!.classList.add('text-red-700'); 
  
    }
   }
  
  
 ngOnInit(): void {
  this.getProductsData()
  
   const storedWishlist = localStorage.getItem('wishlist');
   if (storedWishlist) {
     this.wishlistItems = JSON.parse(storedWishlist);
   }
 
   this.getLoggedUserWishlistData(); 
 
   this.wishlistService.wishListNum.subscribe(count => {
     console.log('Updated Wishlist Count:', count);
   });

}
}
