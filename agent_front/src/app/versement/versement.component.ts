import { Component, OnInit } from '@angular/core';
import { CompteService } from '../Service/compte.service';
import { OperationService } from '../Service/operation.service';
import Swal from 'sweetalert2';
import { Operation } from '../model/operation';
import { AuthentificationService } from '../Service/authentification.service';
import { Agent } from '../model/Agent';
import { Compte } from '../model/compte';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.css']
})
export class VersementComponent implements OnInit {

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
    this.newOperation.agent = this._agent 
    this._compteService.getCompteByRib(this._compte.rib).subscribe(
      data => {
      
       
        this.newOperation.compteDestination = data
        this.newOperation.numOperation = Math.floor(Math.random() * 1000000)
        console.log("Succes Versement \n"+this.newOperation)
        
        this._operationService.verser(this.newOperation)
              .subscribe(
                data =>  Swal.fire({
                  
                  title:"versement effectue par succes ",
                 
                  confirmButtonColor: '#4babc0',
                  confirmButtonText: "OK",
                  width: 600
                  
                }).then(function(){
                  window.location.href = "/operations/liste"})
                   , err => { Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text:"Impossible d'effectuer l'operation",
                  confirmButtonColor: '#4babc0'
                }).then(function(){
                  window.location.href = "/operations/versement";
                })
                   })
      
      }
    )
    

    
    
  }

  init(){
    this._compte = new Compte()
    this.newOperation = new Operation()
    this.newOperation.typeOperation = "versement"
    this.newOperation.numOperation = 0
    this.newOperation.dateOperation = new Date()
    this.newOperation.montant 
    this.newOperation.compteSource = null
    this.newOperation.compteDestination = new Compte()
  }

}
