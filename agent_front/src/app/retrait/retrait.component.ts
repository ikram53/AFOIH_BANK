import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/compte';
import { Operation } from '../model/operation';
import { OperationService } from '../Service/operation.service';
import { AuthentificationService } from '../Service/authentification.service';
import { CompteService } from '../Service/compte.service';
import { Agent } from '../model/Agent';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css']
})
export class RetraitComponent implements OnInit {

  newOperation: Operation
  _compte: Compte
  _agent: Agent

  constructor(private _operationService: OperationService,
              private _auth: AuthentificationService,
              private _compteService: CompteService) { }

  ngOnInit(): void {
    this.init()
    this._auth.currentAgent().subscribe(
      data => {
        this._agent = data
        console.log(this._agent)
      },
      error => console.error(error)
    )
  }

  onSubmit(){
    console.log(this._compte.rib)
    this.newOperation.agent = this._agent //this.compte.agent
    console.log(this._compte.rib)
    this._compteService.getCompteByRib(this._compte.rib).subscribe(
      data => {
        //this._compte = data
        console.log(data)
        this.newOperation.compteSource = data
        this.newOperation.numOperation = Math.floor(Math.random() * 1000000)
        console.log(this.newOperation)
        this._operationService.retirer(this.newOperation)
              .subscribe(
                data =>  Swal.fire({
                  
                  title:"Retrait effectue par succes ",
                 
                  confirmButtonColor: '#4babc0',
                  confirmButtonText: "OK",
                  width: 600
                  
                }).then(function(){
                  window.location.href = "/operations/liste"})
                   , err => { Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Impossible d'effectuer l'operation",
                  confirmButtonColor: '#4babc0',
                }).then(function(){
                  window.location.href = "/operations/retrait";
                })
                   })
      }

      
    )
    

    
    
  }

  init(){
    this._compte = new Compte()
    this.newOperation = new Operation()
    this.newOperation.typeOperation = "retrait"
    this.newOperation.numOperation = 0
    this.newOperation.dateOperation = new Date()
    this.newOperation.montant
    this.newOperation.compteSource = new Compte()
    this.newOperation.compteDestination = null
    
  }

}
