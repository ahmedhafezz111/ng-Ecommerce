import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLodaing:boolean = false
  errMsg:string =""
  isSuccess:string=""

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)


  loginForm:FormGroup = new FormGroup({

    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),

   
  });

  submitForm():void{
    if(this.loginForm.valid){
      this.isLodaing=true
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === "success"){ 
            
            setTimeout( ()=>{

              //save token
              localStorage.setItem('userToken',res.token)

              //decode token
              this.authService.saveUserData()

              //navigate to home
              this.router.navigate(["/home"])
              
            },500)
            this.isSuccess = res.message
          }else{
            this.loginForm.markAllAsTouched()
          }

          this.isLodaing=false
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.errMsg = err.error.message
          this.isLodaing=false
          
        }
  
      })
    }
   
  
    
  }


}
