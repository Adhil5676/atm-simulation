package com.qsp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.qsp.AtmModel.Account;

public interface AccountRepo extends JpaRepository<Account, Integer> {
	@Query("SELECT a FROM Account a WHERE a.accountNo = :accountNo AND a.pin = :pin")
	Account findByAccountNoAndPin(@Param("accountNo") String accountNo, @Param("pin") String pin);

}
