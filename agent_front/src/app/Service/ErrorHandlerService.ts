import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler{
  constructor(private router: Router) { }
    handleError(error:any):void{
      if(error instanceof HttpErrorResponse){
          if(error.status===401){
            console.log("401")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login ou usurname incorecte!',
              
              })  
              this.router.navigateByUrl("/login");
          }
          else if(error.status===403){
            Swal.fire({
              icon: 'error',
              text: 'Login ou usurname incorecte!',
             
            }) 
            this.router.navigateByUrl("/login");
          }
          else{
              window.alert(error.message);
              
          }
        }
    else{
        console.log(error);
    }
      }
    }
    
