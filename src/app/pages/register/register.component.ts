import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isLodaing:boolean = false
  errMsg:string =""
  isSuccess:string=""

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)


  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),
    rePassword:new FormControl(null,  [Validators.required]),
    phone:new FormControl(null,  [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:this.confirmPassword});

  submitForm():void{
    if(this.registerForm.valid){
      this.isLodaing=true
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === "success"){ 
            // account created successfully
            setTimeout( ()=>{
            this.router.navigate(["/login"])
              
            },1000)
            this.isSuccess = res.message
          }

          this.isLodaing=false
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.errMsg = err.error.message
          this.isLodaing=false
          
        }
  
      })
    }else{
      this.registerForm?.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
   
  
    
  }

  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value
    if(password === rePassword ){
      return null
    } else{
      return {mismatch:true}
    }
  }
}
