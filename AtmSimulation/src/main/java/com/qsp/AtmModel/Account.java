package com.qsp.AtmModel;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(name = "account_no")
private String accountNo;
@Column(name = "pin")
private String pin;
private double balance;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getAccountNo() {
	return accountNo;
}
public void setAccountNo(String accountNo) {
	this.accountNo = accountNo;
}
public String getPin() {
	return pin;
}
public void setPin(String pin) {
	this.pin = pin;
}
public double getBalance() {
	return balance;
}
public void setBalance(double balance) {
	this.balance = balance;
}
@Override
public String toString() {
    return "Account { " +
            "ID=" + id +
            ", Account Number='" + accountNo + '\'' +
            ", Balance=" + balance +
            " }";
}


}
