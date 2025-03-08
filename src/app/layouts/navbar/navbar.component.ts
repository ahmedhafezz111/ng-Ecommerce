import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private readonly cartService = inject(CartService)

  cartCount:Signal<number> = computed(()=>this.cartService.cartNumber())
  ngOnInit(): void {
  //  this.cartService.cartNumber.subscribe({
  //   next:(value)=>{
  //       this.cartCount = value
  //   }
  //  })

   this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartService.cartNumber.set(res.numOfCartItems)
    }
   })
  }


  isLoggedIn = input<boolean>(true)
   readonly authService = inject(AuthService)


}
