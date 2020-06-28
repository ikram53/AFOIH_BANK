import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationService } from '../Service/operation.service';
import { Operation } from '../model/operation';
import { Compte } from '../model/Compte';
import { CompteService } from '../Service/compte.service';
import { AuthentificationService } from '../Service/authentification.service';
import { Client } from '../model/client';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  public motCle:string;
  pageOperation:any;
  operationTest: any;
  compte: Compte;
  client: Client;
  ribClient:string;
  constructor(private operationService: OperationService,public activatedRoute: ActivatedRoute,
              private _compteService: CompteService,public router:Router,
              private _authentificationService: AuthentificationService) {
                this.ribClient = activatedRoute.snapshot.params['id'];
               }
  // {"numOperation": 0, "type": "Retrait", "date": "11/11/2020", "acteur": "Agent","source": "CL1", "destination": "CL2", "montant": 200}
  ngOnInit(): void {
    this._authentificationService.currentClient().subscribe(
      client => {
        this.client = client;
        console.log(this.client);
        this._compteService.getCompteByIdClient(this.client.id).subscribe(
          data => {
            this.compte = data
            console.log(this.compte.rib)
    
            this.operationService.getOperation(this.ribClient)
            .subscribe(
              data =>{
                console.log("show : "+data);
                this.operationTest =<Operation>data;
    
                this.pageOperation = this.operationTest;
                console.log(this.operationTest)
              },
              error => console.error(error)
              )  
    
          },
          error => console.error(error)
        )
      },
      error => console.error(error)
    )

    
        
  }
    filter(op: Operation):any{
      return op
    }

    keyBoardEvent(e) {
      console.log(this.motCle);
      console.log("event")
      console.log(this.motCle.length);
      if ( this.motCle.length !== 0) {
        this.recherche();
      }
      else {
        this.listOperation();
      }
    }
    listOperation(){
      console.log('list')
      this.operationService.getOperation(this.ribClient)
      .subscribe((data)=>{
        this.pageOperation=data;
         }),(error)=> err=>{
           console.log("errrrrre")
          this.router.navigateByUrl("/login");
        }
      }
  
    recherche() {
      this.operationService.cherche(this.motCle,this.ribClient)
      .subscribe((data: any) => {
       this.pageOperation = data;
       console.log(data)
       if (data.length==0) {
         console.log("vide")
          Swal.fire(
            {
              confirmButtonColor: '#dc6002',
            text:'Aucun enregistrement n est trouvé'}
            )}
        } , ( error) => console.log(error));
    }

}
