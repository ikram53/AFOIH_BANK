import { Agent } from './Agent';
import { Client } from './client';

export class Compte{
	typeCompte: string = null
	numCompte: number;
	 rib: string="";
	 dateCreation: Date;
	 solde: number=0;
	 etat: number;
	 fraisOuverture: number=0;
	 client: Client=null;
     agent: Agent=null;
     
     constructor(){}
}
