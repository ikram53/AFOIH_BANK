import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpHeaders } from '@angular/common/http';


@Injectable()
export class XhrInterceptor implements HttpInterceptor{
  private jwtToken:string;

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
     console.log(req.url.indexOf("https://afoihi-agent.herokuapp.com/login") )
    if (req.url.indexOf("https://afoihi-agent.herokuapp.com/login") === 0) {
      console.log("do nothing");
      return next.handle(req);
    }
  else{

  console.log("inter-1")
  
    this.jwtToken=localStorage.getItem('token');
     console.log(this.jwtToken);

     
    const xhr=req.clone({ setHeaders: { Authorization: ` ${this.jwtToken}`} });
console.log(xhr);
    return next.handle(xhr);
  }
  }

}
