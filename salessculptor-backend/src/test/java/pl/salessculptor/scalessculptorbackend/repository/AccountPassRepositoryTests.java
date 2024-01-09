package pl.salessculptor.scalessculptorbackend.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import pl.salessculptor.scalessculptorbackend.model.AccountPass;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@DataJpaTest
public class AccountPassRepositoryTests {

    @Autowired
    private AccountPassRepository accountPassRepository;

    @Test
    public void testFindByUsername_ExistingUsername() {
        // Given
        AccountPass accountPass = new AccountPass();
        accountPass.setUsername("existing_username");
        accountPassRepository.save(accountPass);

        AccountPass foundAccountPass = accountPassRepository.findByUsername("existing_username");

        assertNotNull(foundAccountPass);
    }

}

