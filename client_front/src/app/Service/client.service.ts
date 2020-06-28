import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http:HttpClient){}
  client:BehaviorSubject<Client>=new BehaviorSubject<Client>(new Client());
  currentAgent:Observable<Client>=this.client.asObservable();

  // _url = "https://ebank-client-back.herokuapp.com/client/"
  _url = "http://localhost:8081/"

  getClients(){
    return this.http.get(this._url+"client/listClient");
}

getClient(id:number){
  return this.http.get<Client>(this._url+"/client/"+id);
}

updateClient(client:Client){
  return this.http.put(this._url+"/client/update/"+client.id,client);
}
changeClient(client: Client){
  this.client.next(client)
}
changerPass(client:Client){
  return this.http.put("https://afoih-client.herokuapp.com/client/changerPass/"+client.id,client);
}

}
