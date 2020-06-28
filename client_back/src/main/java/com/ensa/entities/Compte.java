package com.ensa.entities;


import java.util.Date;




public  class Compte{
	
	private String typeCompte;
	private Long numCompte;
	private String rib;
	private Date dateCreation;
	private Double solde;
	private int etat;
	private Double fraisOuverture;
	
	
	private Client client;
	
   
 
	private Agent agent;
	
   /*
	@OneToMany(mappedBy="compteSource",cascade = CascadeType.ALL)
	private Collection<Operation> compteSource;
	
	@OneToMany(mappedBy="compteDestination",cascade = CascadeType.ALL)
	private Collection<Operation> compteDestination;*/
	
	

	public Long getNumCompte() {
		return numCompte;
	}

	
	public void setNumCompte(Long numCompte) {
		this.numCompte = numCompte;
	}

	
	
	public Double getSolde() {
		return solde;
	}

	public void setSolde(Double solde) {
		this.solde = solde;
	}

	
	public String getRib() {
		return rib;
	}

	
	public void setRib(String rib) {
		this.rib = rib;
	}

	
	
	public Date getDateCreation() {
		return dateCreation;
	}

	
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public int isEtat() {
		return etat;
	}

	
	public void setEtat(int etat) {
		this.etat = etat;
	}

	public Double getFraisOuverture() {
		return fraisOuverture;
	}

	
	public void setFraisOuverture(Double fraisOuverture) {
		this.fraisOuverture = fraisOuverture;
	}
	
	
	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}
	
	public Agent getAgent() {
		return agent;
	}

	
	public void setAgent(Agent agent) {
		this.agent = agent;
	}


	public String getTypeCompte() {
		return typeCompte;
	}

	public void setTypeCompte(String typeCompte) {
		this.typeCompte = typeCompte;
	}

	public Compte() {
	super();
	}


	public Compte(String typeCompte, Long numCompte, String rib, Date dateCreation, Double solde, int etat, Double fraisOuverture, Client client, Agent agent) {
		this.typeCompte = typeCompte;
		this.numCompte = numCompte;
		this.rib = rib;
		this.dateCreation = dateCreation;
		this.solde = solde;
		this.etat = etat;
		this.fraisOuverture = fraisOuverture;
		this.client = client;
		this.agent = agent;
	}

	public Compte(String rib, Date dateCreation, int etat, Double fraisOuverture) {
		super();
		this.rib = rib;
		this.dateCreation = dateCreation;
		this.etat = etat;
		this.fraisOuverture = fraisOuverture;
	}


	public Compte( Client client,Agent agent) {
		super();
		this.client = client;
		this.agent = agent;

	}

	@Override
	public String toString() {
		return "Compte{" +
				"typeCompte='" + typeCompte + '\'' +
				", numCompte=" + numCompte +
				", rib='" + rib + '\'' +
				", dateCreation=" + dateCreation +
				", solde=" + solde +
				", etat=" + etat +
				", fraisOuverture=" + fraisOuverture +
				", client=" + client +
				", agent=" + agent +
				'}';
	}

	public int getEtat() {
		return etat;
	}

}
