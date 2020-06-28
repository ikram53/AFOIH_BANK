import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/Compte';
import { Client } from '../model/client';
import { AuthentificationService } from '../Service/authentification.service';
import { CompteService } from '../Service/compte.service';
import { Agent } from '../model/Agent';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-nemu-bar',
  templateUrl: './nemu-bar.component.html',
  styleUrls: ['./nemu-bar.component.css']
})
export class NemuBarComponent implements OnInit {
  compte: Compte
  client: Client
  ListCompte:Compte[]=[];
  compteur=0;
  CCDesactive:Boolean=false;
  constructor(private _compteService: CompteService,private route:Router,
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
                  for(let list of this.ListCompte){ 
                  if(list.etat==0) this.compteur=this.compteur+1;
                  if(list.typeCompte=="CC" && list.etat == 0) this.CCDesactive=true;
                  }

                  
                  if(this.compteur==this.ListCompte.length){  
                    Swal.fire({
                      icon: 'error',
                      position: 'center',
                      title: 'Votre compte est désactivé',
                      showConfirmButton: false,
                      width:600,
                      timer: 2000
                    }).then(function(){
                      window.location.href = "/login";
                    })
                }
                  
                },
                error => console.error(error)
              )
            }
          )
        }
    
  

  logout(){
    console.log("logout")
    Swal.fire({
      title: 'Vous voulez vraiment se déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#dc6002',
      cancelButtonText: 'Non',
      confirmButtonText: 'Oui !'
    }).then((result) => {
      if (result.value) {  
        localStorage.removeItem('token');
        this.route.navigateByUrl('/login');
      }
        err=>{ Swal.fire(
          'Erreur ...')}
      
    })
   
  }
  changePass(id:number){
    this.route.navigate(['password',id]);
  }


}
