import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Agent } from '../model/Agent';
import { Subject, BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class LoginService {

  authenticated: boolean = false;


 
 

  constructor(private http: HttpClient,
    private cookieService:CookieService
    ) { }

 


  authenticate(credentials){
 
    const token=btoa(credentials.username +':'+credentials.password);
    const headers=new HttpHeaders({
      Authorization:'Basic ' + token
    });
  
 
    this.cookieService.set('token', token);
    


  return this.http.get<Agent>("https://afoihi-agent.herokuapp.com/acceuil",{headers});
   
 
  
  }

  
  }


    

   

  
