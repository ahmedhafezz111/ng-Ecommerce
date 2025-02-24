import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
    categories:ICategory[]=[]
  
  private readonly categoriesService = inject(CategoriesService)


getCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categories=res.data
      
    }
  })
}

ngOnInit(): void {
  this.getCategoriesData()
}



}
