package pl.salessculptor.scalessculptorbackend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AccountPassServiceTests {

    @Autowired
    private AccountPassService accountPassService;

    // Przypadek, gdy użytkownik o podanym loginie i haśle istnieje w bazie danych
    @Test
    public void testAuthenticateUser_ValidCredentials() {
        String username = "user2";
        String password = "password2";

        boolean isAuthenticated = accountPassService.authenticateUser(username, password);
        assertTrue(isAuthenticated);
    }

    // Przypadek, gdy użytkownik o podanym loginie nie istnieje w bazie danych
    @Test
    public void testAuthenticateUser_UserNotFound() {
        String username = "nonExistingUser";
        String password = "testPassword";

        boolean isAuthenticated = accountPassService.authenticateUser(username, password);
        assertFalse(isAuthenticated);
    }

    // Przypadek, gdy hasło podane przez użytkownika jest nieprawidłowe
    @Test
    public void testAuthenticateUser_InvalidPassword() {
        String username = "testUser";
        String password = "invalidPassword";

        boolean isAuthenticated = accountPassService.authenticateUser(username, password);
        assertFalse(isAuthenticated);
    }
}
