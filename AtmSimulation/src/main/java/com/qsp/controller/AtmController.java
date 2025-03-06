package com.qsp.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.AtmModel.Account;
import com.qsp.services.AccountService;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/atm")
public class AtmController {
	private final AccountService accountService;
	
	public AtmController(AccountService accountService) {
		this.accountService = accountService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String accountNo, @RequestParam String pin ){
		Account account = accountService.authenticate(accountNo, pin);
		return account != null ? ResponseEntity.ok(account) : ResponseEntity.status(401).body("Invalid Credentials");
		
	}
	
	@GetMapping("/balance/{id}")
	public ResponseEntity<Double> checkBalance(@PathVariable int id){
		return ResponseEntity.ok(accountService.checkBalance(id));
		
	}
	
	@PostMapping("/deposit")
	public ResponseEntity<?> deposit(@RequestBody Map<String, Object> request){
		 
		try {
			if (!request.containsKey("id") || !request.containsKey("amount")) {
				return ResponseEntity.status(400).body("missing account id or amount");
			}
			Object idObj = request.get("id");
			Object amountObj = request.get("amount");
			
			if (idObj == null || amountObj == null) {
	            return ResponseEntity.status(400).body("ID or amount is null");
	        }
		
			int id = Integer.parseInt(idObj.toString());
	        double amount = Double.parseDouble(amountObj.toString());

	        Account account = accountService.deposit(id, amount);
	        return ResponseEntity.ok(account);
	    } catch (NumberFormatException e) {
	        return ResponseEntity.status(400).body("Invalid number format: " + e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
	    }
		
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<?> withdraw(@RequestParam int id, @RequestParam double amount){
		return accountService.withdraw(id, amount)
				? ResponseEntity.ok("Withdraw Successful")
				: ResponseEntity.status(400).body("Insufficent balance");	
	}

}
