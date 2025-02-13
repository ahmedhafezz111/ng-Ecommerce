import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { 
        path: "", 
        component: AuthLayoutComponent, 
        canActivate:[loggedGuard],
        children: [
            { path: "login", loadComponent: () => import("./pages/login/login.component").then(c => c.LoginComponent), title: "Login" },
            { path: "register", loadComponent: () => import("./pages/register/register.component").then(c => c.RegisterComponent), title: "Register" },
            { path: "forget", loadComponent: () => import("./shared/components/forgetpassword/forgetpassword.component").then(c => c.ForgetpasswordComponent), title: "Forget Password" },
        ] 
    },
    { 
        path: "", 
        component: BlankLayoutComponent, 
        canActivate:[authGuard],
        children: [
            { path: "home", loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent), title: "Home" },
            { path: "cart", loadComponent: () => import("./pages/cart/cart.component").then(c => c.CartComponent), title: "Cart" },
            { path: "products", loadComponent: () => import("./pages/products/products.component").then(c => c.ProductsComponent), title: "Products" },
            { path: "brands", loadComponent: () => import("./pages/brands/brands.component").then(c => c.BrandsComponent), title: "Brands" },
            { path: "categories", loadComponent: () => import("./pages/categories/categories.component").then(c => c.CategoriesComponent), title: "Categories" },
            { path: "details/:id", loadComponent:()=> import("./pages/details/details.component").then(c=>c.DetailsComponent),title:"Details" },
            { path: "checkout", loadComponent: () => import("./pages/checkout/checkout.component").then(c => c.CheckoutComponent), title: "Checkout" },
            { path: "**", loadComponent: () => import("./pages/notfound/notfound.component").then(c => c.NotfoundComponent), title: "Not Found" }
        ]
    }
];
