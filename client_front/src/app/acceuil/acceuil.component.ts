import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/Compte';
import { Client } from '../model/client';
import { AuthentificationService } from '../Service/authentification.service';
import { CompteService } from '../Service/compte.service';
import { Agent } from '../model/Agent';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  compte: Compte
  client: Client
  ListCompte:Compte[]=[];
  compteur=0;
  constructor(private _compteService: CompteService, public router:Router,
    private _authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.compte = new Compte()
    this.compte.client = new Client()
    this.compte.agent = new Agent()

    this._authentificationService.currentClient().subscribe(
      client => {
        
        this.client = client;
        console.log(client);
        this._compteService.getComptesClient(this.client.id).subscribe(
          data => {
            this.ListCompte = data
  }
        )
})

}

toOperation(rib:string){
  console.log(rib)
  this.router.navigate(['operations/liste',rib],{skipLocationChange: true});

}
}
