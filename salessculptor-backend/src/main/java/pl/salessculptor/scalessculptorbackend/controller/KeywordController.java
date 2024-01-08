package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.salessculptor.scalessculptorbackend.model.Keyword;
import pl.salessculptor.scalessculptorbackend.repository.KeywordRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/keywords")
public class KeywordController {

    @Autowired
    KeywordRepository keywordRepository;

    @GetMapping("")
    public List<Keyword> getAllProducts() {
        return keywordRepository.findAll();
    }
}
