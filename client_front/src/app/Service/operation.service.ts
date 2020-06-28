import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operation } from '../model/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

   _url = "http://localhost:8081/operation/"
  // _urlClient = "http://localhost:8082/operation/"
  _urlClient="https://afoih-client.herokuapp.com/operation/"
 
  constructor(private http: HttpClient) { }



  getOperation(rib: string){
    return this.http.get<Operation>(this._urlClient+"listOperation/"+rib)
  }

  verser(operation: Operation){
    return this.http.post<any>(this._urlClient+"versement", operation)
  }

  retirer(operation: Operation){
    return this.http.post<any>(this._urlClient+"retrait", operation)
  }

  virer(operation: Operation){
    return this.http.post<any>(this._urlClient+"virement", operation)
  }

  recharge(operation: Operation, codeRacharge:number){
    return this.http.post<Operation>(this._urlClient+"recharge/"+codeRacharge, operation)
  }

  chercherOperation(motCle: String,rib:String){
    console.log(motCle);
    console.log(rib);
   return this.http.get(this._urlClient+"chercheO?mc="+motCle+"&rib="+rib);
    }

    cherche(motCle: String,rib:String){
      console.log(motCle);
      console.log(rib);
     return this.http.get(this._urlClient+"cherche/"+motCle+"/"+rib);
      }

  
}
