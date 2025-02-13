import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../shared/pipes/sale/sale.pipe';
import { TermtextPipe } from '../../shared/pipes/termtext/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,FormsModule,RouterLink,SearchPipe ,CurrencyPipe,SalePipe ,TermtextPipe],
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

// service injection for using api in home comp..
 private readonly productsService = inject(ProductsService)
 private readonly categoriesService = inject(CategoriesService)
 private readonly cartService = inject(CartService)


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
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

 ngOnInit(): void {
  this.getProductsData()
  this.getCategoriesData()
 }
}
