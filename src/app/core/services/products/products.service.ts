import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }
  getAllProudcts():Observable<any>{
   return this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getSpecificProudct(id:string | null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
   }
}
