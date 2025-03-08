import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../shared/pipes/sale/sale.pipe';
import { TermtextPipe } from '../../shared/pipes/termtext/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,FormsModule,RouterLink,SearchPipe ,CurrencyPipe ,TermtextPipe,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  text:String = ""

  // mainslider: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 700,
  //   items: 1,  
  //   autoplay: true,
  //   autoplayTimeout: 4000,
  //   autoplayHoverPause: true,
  //   navText: ['', ''],
  //   responsive: {
  //     0: { items: 1 },   
  //     400: { items: 1 }, 
  //     740: { items: 1 }, 
  //     940: { items: 1 }  
  //   },
  //   nav: false
  // };
  
  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      items:1,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: false
  };

 private readonly productsService = inject(ProductsService)
 private readonly categoriesService = inject(CategoriesService)
 private readonly cartService = inject(CartService)
 private readonly toastrService = inject(ToastrService)
 private readonly ngxSpinnerService = inject(NgxSpinnerService)
private readonly wishlistService = inject(WishlistService)
 
  wishlistItems : IWishlist[] = []

  products:IProduct[]=[]
  categories:ICategory[]=[]

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

  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories=res.data
        
        },error:()=>{
      this.ngxSpinnerService.hide('loading-2')

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
  this.getCategoriesData()
  
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