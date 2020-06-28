import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http:HttpClient){}

  //private _url = "http://localhost:8081/"
  private _url="https://afoihi-agent.herokuapp.com/";

  getClients(){
    return this.http.get(this._url+"client/list");
}

 chercherClient(motCle:String){
  return this.http.get(this._url+"agent/chercher/"+motCle);
}

getClient(id: number) {
  return this.http.get<Client>(this._url+"client/"+id);
}

updateClient(client: Client) {
  console.log("update");
  return this.http.put(this._url+"client/update/"+client.id,client);
}

deleteClient(id: number) {
  return this.http.delete(this._url+"client/delete/"+id);
}

saveClient(client: Client) {

  return this.http.post(this._url+"agent/ajoutClient",client);
}
sendEmailToClient(client: Client) {
  return this.http.post(this._url+"agent/send-email",client);
}

}
