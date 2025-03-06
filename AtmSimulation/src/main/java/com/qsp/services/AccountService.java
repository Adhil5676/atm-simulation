package com.qsp.services;

import org.springframework.stereotype.Service;

import com.qsp.AtmModel.Account; 
import com.qsp.repository.AccountRepo;

@Service
public class AccountService {
	
	private final AccountRepo accountRepo;
	
	public AccountService(AccountRepo accountRepo) {
		this.accountRepo = accountRepo;
	}
	
	public Account authenticate(String accountNo, String pin) {
		System.out.println("Checking For Account: " + accountNo +" | PIN: " + pin);
		Account account = accountRepo.findByAccountNoAndPin(accountNo, pin);
		if (account == null) {
			System.out.println(" No MAtching Account found.");
		}else {
			System.out.println("Account Found" + account);
		}
		return account;
	}
	
	public double checkBalance(int id) {
		return accountRepo.findById(id).orElseThrow().getBalance();
		
	}
	public Account deposit(int id,double amount) {
		Account account = accountRepo.findById(id).orElseThrow();
		account.setBalance(account.getBalance() + amount);
		return accountRepo.save(account);
		}
	public boolean withdraw(int id, double amount) {
		Account account = accountRepo.findById(id).orElseThrow();
		if (account.getBalance() >= amount) {
			account.setBalance(account.getBalance() - amount);
			accountRepo.save(account);
			return true;
		} 
		return false;
	}
	
}
