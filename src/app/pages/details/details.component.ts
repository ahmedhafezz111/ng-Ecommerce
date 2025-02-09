import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  detailsProduct:IProduct | null = null 

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(p)=>{
          console.log(p.get('id'));
          let idProduct = p.get('id')

          this.productsService.getSpecificProudct(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct = res.data
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
        }
      })
  }
}
