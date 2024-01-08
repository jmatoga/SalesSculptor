package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.salessculptor.scalessculptorbackend.exception.CampaignNotFoundException;
import pl.salessculptor.scalessculptorbackend.model.*;
import pl.salessculptor.scalessculptorbackend.repository.KeywordRepository;
import pl.salessculptor.scalessculptorbackend.repository.ProductRepository;
import pl.salessculptor.scalessculptorbackend.repository.TownRepository;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("")
    public DropDownListOptions getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<Town> towns = townRepository.findAll();
        List<Keyword> keywords = keywordRepository.findAll();

        DropDownListOptions result = new DropDownListOptions();
        result.setTown(towns);
        result.setProduct(products);
        result.setKeyword(keywords);

        return result;
    }
}
