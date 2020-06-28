import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte } from '../model/Compte';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  constructor(private http:HttpClient){}

   _url = "http://localhost:8081/compte/CC/"
  // _urlClient = "http://localhost:8082/compte/CC/"
  _urlClient="https://afoih-client.herokuapp.com/compte/CC/"
  
   hostTest = "http://localhost:8081/compte/CC/test"

   _compte:BehaviorSubject<Compte>=new BehaviorSubject<Compte>(new Compte());
    currentCompte:Observable<Compte>=this._compte.asObservable();

 

getCompte(id:number){
  return this.http.get<Compte>(this._urlClient+id)
}


getCompteByRib(rib:String){
  return this.http.get<Compte>(this._urlClient+"rib/"+rib)
}


getCompteByIdClient(idClient: number){
  console.log("getCompteByIdClient")
  return this.http.get<Compte>(this._urlClient+"client/"+idClient)
}

getComptesClient(idClient: number){
  console.log("les cooomptes")
  return this.http.get<Compte[]>("https://afoih-client.herokuapp.com/comptes/CC/client/"+idClient)
}


getCurrentCompte(){
  return this.getCompte(10)
}


changeCompte(compte: Compte){
  this._compte.next(compte)
}


}
