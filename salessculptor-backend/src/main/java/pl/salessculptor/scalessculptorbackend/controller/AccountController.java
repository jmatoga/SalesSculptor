package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.salessculptor.scalessculptorbackend.model.Account;
import pl.salessculptor.scalessculptorbackend.repository.AccountRepository;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
}
