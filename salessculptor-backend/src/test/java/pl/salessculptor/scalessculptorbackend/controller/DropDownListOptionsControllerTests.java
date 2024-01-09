package pl.salessculptor.scalessculptorbackend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import pl.salessculptor.scalessculptorbackend.model.*;
import pl.salessculptor.scalessculptorbackend.repository.*;

@SpringBootTest
class DropDownListOptionsControllerTests {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private TownRepository townRepository;

    @Mock
    private KeywordRepository keywordRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private DropDownListOptionsController dropDownListOptionsController;

    @Test
    void testGetAllDropDownListOptions() {
        Long accountId = 1L;

        // Mocking the behavior of the repositories
        List<Product> products = Arrays.asList(new Product(), new Product());
        List<Town> towns = Arrays.asList(new Town(), new Town());
        List<Keyword> keywords = Arrays.asList(new Keyword(), new Keyword());
        Account account = new Account();

        when(productRepository.findAll()).thenReturn(products);
        when(townRepository.findAll()).thenReturn(towns);
        when(keywordRepository.findAll()).thenReturn(keywords);
        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));

        // Testing the method
        DropDownListOptions result = dropDownListOptionsController.getAllDropDownListOptions(accountId);

        // Assertions
        assertEquals(towns.size(), result.getTown().size());
        assertEquals(products.size(), result.getProduct().size());
        assertEquals(keywords.size(), result.getKeyword().size());
        assertEquals(account, result.getAccount());
    }
}
