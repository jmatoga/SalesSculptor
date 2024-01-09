package pl.salessculptor.scalessculptorbackend.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import pl.salessculptor.scalessculptorbackend.model.Account;
import pl.salessculptor.scalessculptorbackend.repository.AccountRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class AccountControllerTests {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountController accountController;

    @Test
    void testGetAllAccounts() {
        List<Account> accounts = Arrays.asList(new Account(), new Account());
        when(accountRepository.findAll()).thenReturn(accounts);

        List<Account> returnedAccounts = accountController.getAllAccounts();

        assertEquals(accounts.size(), returnedAccounts.size());
    }
    @Test
    void testGetAccountById() {
        Long accountId = 1L;
        Account account = new Account();
        account.setAccountId(accountId);

        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));

        Account returnedAccount = accountController.getAccountById(accountId);

        assertEquals(account.getAccountId(), returnedAccount.getAccountId());
    }
}