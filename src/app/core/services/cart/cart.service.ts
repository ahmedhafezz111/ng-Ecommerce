import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken:any = localStorage.getItem("userToken") !
  constructor(private httpClient:HttpClient) { }

  addProductToCart(id:string):Observable<any>{
  return  this.httpClient.post(environment.baseUrl+`/api/v1/cart` , 
    {
      "productId": id
    },
   
   
  )
  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/api/v1/cart` ,
    
    )
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/cart/${id}`,
    
    )

 
  }

  updateCartQuantity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/api/v1/cart/${id}`,
      {
        count:newCount
      },
    
    )

 
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/cart`,
    
    )
  }
}
