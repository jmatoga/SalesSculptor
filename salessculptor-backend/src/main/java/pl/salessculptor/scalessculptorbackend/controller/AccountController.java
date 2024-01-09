package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.salessculptor.scalessculptorbackend.model.Account;
import pl.salessculptor.scalessculptorbackend.model.AccountPass;
import pl.salessculptor.scalessculptorbackend.repository.AccountPassRepository;
import pl.salessculptor.scalessculptorbackend.repository.AccountRepository;
import pl.salessculptor.scalessculptorbackend.service.AccountPassService;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountPassRepository accountPassRepository;

    @Autowired
    AccountPassService accountPassService;

    @GetMapping("")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<String> postLogin(@RequestBody AccountPass accountPassToCheck) {
        boolean result = accountPassService.authenticateUser(accountPassToCheck.getUsername(), accountPassToCheck.getPasswordHash());
        if(!result) {
            return ResponseEntity.badRequest().body("Wrong username or password");
        } else {
            Long loggedUserId = accountPassRepository.findByUsername(accountPassToCheck.getUsername()).getAccountId();

            return ResponseEntity.ok("Logged successfully with id: " + loggedUserId);
        }
    }

    @GetMapping("/{accountId}")
    public Account getAccountById(@PathVariable("accountId") Long accountId) {
        return accountRepository.findById(accountId).get();
    }
}
