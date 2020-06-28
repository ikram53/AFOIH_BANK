import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }

  //private host:string="http://localhost:8082";
  private host:string="https://afoih-client.herokuapp.com"
 

  login(user){
   
    return  this.http.post(this.host+"/login",user,{'observe':'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('token',jwt);
  }

  currentClient(){
   return this.http.get<Client>(this.host+"/client/currentClient");
  }
}
