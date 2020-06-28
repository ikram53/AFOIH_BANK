import { Component, OnInit } from '@angular/core';
import { Operation } from '../model/operation';
import { OperationService } from '../Service/operation.service';
import { Compte } from '../model/Compte';
import { Agent } from '../model/Agent';
import { CompteService } from '../Service/compte.service';
import { AuthentificationService } from '../Service/authentification.service';
import { Client } from '../model/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  newOperation: Operation
  compte: Compte
  codeRecharge: CodeRecharge
  client: Client


  constructor(private _operationService: OperationService,
              private _compteService: CompteService,
              private _authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.init()
    this.codeRecharge = new CodeRecharge()
    this._authentificationService.currentClient().subscribe(
      client => {
        this.client = client;
        console.log(client);
        this._compteService.getCompteByIdClient(this.client.id).subscribe(
          data => {
            this.compte = data
            console.log(this.compte)
            this.compte.client = this.client
          },
          error => console.error(error)
        )
      }
    )

    

  }

  onSubmit(){
    this.newOperation.agent = null //this.compte.agent
    this.newOperation.compteDestination = this.compte
    this.newOperation.compteDestination.typeCompte = "CC"
    this.newOperation.numOperation = Math.floor(Math.random() * 1000000)
    console.log("Succes Recharge \n"+this.newOperation)
    this._operationService.recharge(this.newOperation, parseInt(this.codeRecharge.code))
             
    .subscribe(
      data => Swal.fire({
                  
        title:"Recharge effectue par succes ",
        confirmButtonColor: '#dc6002',
        confirmButtonText: "OK",
        width: 600
        
      }).then(function(){
        window.location.href = "/acceuil"})
         , err => { Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#dc6002',
        text: 'Code recharge non valide !'
      }).then(function(){
        window.location.href = "/operations/recharge";
      })
         })
  }




  init(){
    this.newOperation = new Operation()
    this.newOperation.typeOperation = "recharge"
    this.newOperation.numOperation = 0
    this.newOperation.dateOperation = new Date()
    this.newOperation.montant = 0
    this.newOperation.compteSource = null
  
  }

}

export class CodeRecharge{
  code: string
  constructor(){}
}
