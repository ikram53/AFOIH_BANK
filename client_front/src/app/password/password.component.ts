import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { AuthentificationService } from '../Service/authentification.service';
import { ClientService } from '../Service/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  client:Client=new Client();
  nouveauPass:string
  confirmPass:string;
  constructor(private _authentificationService: AuthentificationService, public router: Router,public serviceClient: ClientService) { }

  ngOnInit(): void {
    this._authentificationService.currentClient().subscribe(
      client => {
        this.client = client;})
  }


  changerPass(){
   
    if(this.nouveauPass==this.confirmPass){
      this.client.password=this.nouveauPass;
      this.serviceClient.changerPass(this.client)
      .subscribe(data => {Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mot de passe changé',
        /*showConfirmButton: false, 
        timer: 1500*/
      });
     });
     this.router.navigate(['login']);}
    else{console.log("not same")
    
  }
  }
  toAcceuil(){
    this.router.navigate(['acceuil']);
  }

}
