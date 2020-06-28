import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Compte } from '../model/compte';
import { Agent } from '../model/Agent';
import { AgentService } from '../Service/agent.service';
import { CompteService } from '../Service/compte.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Service/authentification.service';


@Component({
  selector: 'app-multi-form',
  templateUrl: './multi-form.component.html',
  styleUrls: ['./multi-form.component.css']
})
export class MultiFormComponent implements OnInit {
  client: Client = new Client();
  compte: Compte = new Compte();
  nouveauCompte: Compte;
  currentAgent: Agent;
  nextS1: boolean = false;
  nextS2: boolean = false;

  constructor( private _auth: AuthentificationService,
     private compteService: CompteService ) { }

    ngOnInit(): void {

      this._auth.currentAgent().subscribe(
        data => {
        
          this.compte.agent=data;
         
        },
        error =>  window.location.href = "/login"
      )
    
    }

    numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43) {
        return false;
      }
      return true;
    }

    onNextStep1() {
      this.compte.client = this.client;
      this.nextS1 = true;
    }
    onTerminer(){ window.location.href = "/listClient";}

  onNextStep2() {
    
  this.compteService.saveCompte(this.compte)
    .subscribe(response => {
      this.nouveauCompte = response;
     
    
    });
    this.nextS2 = true;
    
  }

}
