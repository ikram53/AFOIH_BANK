import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor{
  private jwtToken:string;

  constructor(){}
   intercept(req: HttpRequest<any>, next: HttpHandler){
     console.log(req.url.indexOf('https://afoih-client.herokuapp.com/login') )
    if (req.url.indexOf('https://afoih-client.herokuapp.com/login') === 0) {
      return next.handle(req);
    }
  else{
    this.jwtToken=localStorage.getItem('token');
    const xhr=req.clone({ setHeaders: { Authorization: ` ${this.jwtToken}` } });
    return next.handle(xhr);
  }
  }

  
}
