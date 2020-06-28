package com.ensa.e_banking;

import com.ensa.e_banking.dao.AgentRepository;
import com.ensa.e_banking.dao.RechargeRepository;
import com.ensa.e_banking.entities.Agent;
import com.ensa.e_banking.entities.Recharge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;



@SpringBootApplication
@ComponentScan({ "com.ensa.e_banking.service","com.ensa.e_banking.interfacesImpl","com.ensa.e_banking.entities",
	"com.ensa.e_banking.interfacesMetier","com.ensa.e_banking.dao","com.ensa.e_banking.security",
	"com.ensa.e_banking.config"
	})
@EnableScheduling
public class EBankingAppApplication implements CommandLineRunner {
	@Autowired
	AgentRepository agentRepository;


	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}


	public static void main(String[] args) {
	
			SpringApplication.run(EBankingAppApplication.class, args);
			 
		}
	@Autowired
   BCryptPasswordEncoder bCryptPasswordEncoder=new  BCryptPasswordEncoder();
@Autowired
	RechargeRepository rechargeRepository;

	@Override
	public void run(String... args) throws Exception {

   Recharge code1=new Recharge((long)10001000,(double)1000);
   Recharge code2=new Recharge((long)20002000,(double)2000);
   Recharge code3=new Recharge((long)30003000,(double)30);

		rechargeRepository.save(code1);rechargeRepository.save(code2);rechargeRepository.save(code3);
		
	}
	
	

	}

