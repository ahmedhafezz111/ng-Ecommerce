import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken:any = localStorage.getItem("userToken") !
  constructor(private httpClient:HttpClient) { }


  checkoutPayment(id:string , data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
      },
      
    
    )
  }
}
