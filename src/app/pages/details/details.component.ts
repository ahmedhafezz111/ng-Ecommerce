import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add this
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';

@Component({
  selector: 'app-details',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  detailsProduct: IProduct | null = null;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
  
   wishlistItems : IWishlist[] = []
 



  selectedImage: string | null = null;

  selectImage(image: string): void {
    this.selectedImage = image;
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
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        let idProduct = p.get('id');

        this.productsService.getSpecificProudct(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsProduct = res.data;
            this.selectedImage = this.detailsProduct?.imageCover || null;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });

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