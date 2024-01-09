package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.salessculptor.scalessculptorbackend.model.*;
import pl.salessculptor.scalessculptorbackend.repository.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dropDownListOptions")
public class DropDownListOptionsController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    TownRepository townRepository;

    @Autowired
    KeywordRepository keywordRepository;

    @Autowired
    AccountPassRepository accountPassRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/{accountId}")
    public DropDownListOptions getAllDropDownListOptions(@PathVariable("accountId") Long accountId) {
        List<Product> products = productRepository.findAll();
        List<Town> towns = townRepository.findAll();
        List<Keyword> keywords = keywordRepository.findAll();
        Account account = accountRepository.findById(accountId).get();

        DropDownListOptions dropDownListOptions = new DropDownListOptions();
        dropDownListOptions.setTown(towns);
        dropDownListOptions.setProduct(products);
        dropDownListOptions.setKeyword(keywords);
        dropDownListOptions.setAccount(account);

        return dropDownListOptions;
    }
}
