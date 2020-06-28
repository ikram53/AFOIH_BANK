import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../Service/client.service';
import Swal from 'sweetalert2';

import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../model/client';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
 public motCle:string;
 pageClient:any=[];

 idClient:number;
 
 
 constructor(public http:HttpClient,public clientService:ClientService,
  public router:Router, public activatedRoute:ActivatedRoute) { 

  }

  ngOnInit(): void {
    console.log("init")
   this.listClient();
  }

  listClient(){
    console.log('list')
    this.clientService.getClients()
    .subscribe((data)=>{
      this.pageClient=data;
       }),(error)=> err=>{
         console.log("errrrrre")
        this.router.navigateByUrl("/login");
      }
    }
   

    
  

  onEditClient(id:number){
   this.router.navigate(['editClient',id],{skipLocationChange: true});
 }

 onDetailClient(id:number){
  this.router.navigate(['detailsClient',id],{skipLocationChange: true});
 }

 onDeleteClient(client: Client){
  Swal.fire({
    title: 'Vous etes sur?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '#4babc0',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui supprimé !',

  }).then((result) => {
    if (result.value) {  
      Swal.fire({
                  
        title:"Suppression avec succes",
        confirmButtonColor: '#4babc0',
        confirmButtonText: "OK",
        width: 600
        
      })
      this.clientService.deleteClient(client.id)
     .subscribe(data => {
       console.log(this.pageClient.indexOf(client));
       this.pageClient.splice(
        this.pageClient.indexOf(client),1);
        window.location.href = "listClient";
      },
      err=>{ Swal.fire(
        'Erreur non supprime')})
    }
  })
}




keyBoardEvent(e) {
  console.log(this.motCle);
  console.log(this.motCle.length);
  if ( this.motCle.length !== 0) {
    this.recherche();
  }
  else {
    this.listClient();
  }
}

recherche() {
  this.clientService.chercherClient(this.motCle)
  .subscribe((data: any) => {
   this.pageClient = data;
   console.log(data)
   if (data.length==0) {
     console.log("vide")
      Swal.fire(
        'Aucun enregistrement n est trouvé')}
    } , ( error) => console.log(error));
}


}

 
  


