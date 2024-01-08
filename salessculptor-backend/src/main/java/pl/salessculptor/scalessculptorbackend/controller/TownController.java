package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.salessculptor.scalessculptorbackend.model.Campaign;
import pl.salessculptor.scalessculptorbackend.model.Town;
import pl.salessculptor.scalessculptorbackend.repository.CampaignRepository;
import pl.salessculptor.scalessculptorbackend.repository.TownRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/towns")
public class TownController {

    @Autowired
    TownRepository townRepository;

    @GetMapping("")
    public List<Town> getAllTowns() {
        return townRepository.findAll();
    }
}
