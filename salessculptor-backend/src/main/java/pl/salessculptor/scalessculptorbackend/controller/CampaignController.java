package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pl.salessculptor.scalessculptorbackend.exception.CampaignNotFoundException;
import pl.salessculptor.scalessculptorbackend.model.*;
import pl.salessculptor.scalessculptorbackend.repository.CampaignRepository;
import pl.salessculptor.scalessculptorbackend.repository.KeywordRepository;
import pl.salessculptor.scalessculptorbackend.repository.ProductRepository;
import pl.salessculptor.scalessculptorbackend.repository.TownRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    TownRepository townRepository;

    @Autowired
    KeywordRepository keywordRepository;

//    @GetMapping("/campaignProductTown")
//    public List<CampaignProductTownKeywords> getCampaignProductTown() {
//        // Fetch data from repositories
//        List<Campaign> campaigns = campaignRepository.findAll();
//        List<Product> products = productRepository.findAll();
//        List<Town> towns = townRepository.findAll();
//        List<Keyword> keywords = keywordRepository.findAll();
//
//        // Map data and return
//        List<CampaignProductTownKeywords> result = new ArrayList<>();
//        for (int i = 0; i < campaigns.size(); i++) {
//            CampaignProductTownKeywords campaignProductTown = new CampaignProductTownKeywords();
//            campaignProductTown.setCampaign(campaigns.get(i));
//            campaignProductTown.setProduct(products.get(i));
//            campaignProductTown.setTown(towns.get(i));
//            campaignProductTown.setKeyword(keywords.get(i));
//            result.add(campaignProductTown);
//        }
//        return result;
//    }

    @GetMapping("/campaignProductTown")
    public CampaignProductTownKeywords getCampaignProductTown() {
        // Fetch data from repositories
        //Campaign campaigns = campaignRepository.findAll();
//        List<Product> products = productRepository.findAll();
//        List<Town> towns = townRepository.findAll();
//        List<Keyword> keywords = keywordRepository.findAll();
//
//        // Map data and return
//        CampaignProductTownKeywords result = new CampaignProductTownKeywords();
//        Optional<Campaign> campaign = campaignRepository.findById(id);
//        // Jeśli Campaign zostało znalezione
//        if (campaign.isPresent()) {
//            Optional<Product> product = productRepository.findById(campaign.get().getProduct().getProductId());
//            Optional<Town> town = townRepository.findById(campaign.get().getTown().getTownId());
//
//            // Sprawdź, czy opcjonalne dane są dostępne i przypisz do kampanii
//            product.ifPresent(campaign.get()::setProduct);
//            town.ifPresent(campaign.get()::setTown);
//
//            return campaign.get();
//
//        } else {
//            throw new CampaignNotFoundException(id);
//        }
//
//
//        result.setCampaign(campaigns);
//        result.setTown(towns);
//        result.setProduct(products);
//        result.setKeyword(keywords);
//
//        return result;
        return null;
    }

    @GetMapping("")
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @GetMapping("/active")
    public List<Campaign> getActiveCampaigns() {
        return campaignRepository.findActiveCampaigns();
    }

    @GetMapping("/active1")
    public List<Campaign> getActiveCampaigns1() {
        return campaignRepository.findByStatus(CampaignStatus.ON);
    }

    @GetMapping("/active2")
    public Optional<Campaign> getActiveCampaigns2() {
        return campaignRepository.findById(1L);
    }

    //    @GetMapping("/{id}")
//    public Campaign getById(@PathVariable("id") Long id) {
//        // Fetch data from repositories
//        Optional<Campaign> campaign = campaignRepository.findById(id);
//        // Jeśli Campaign zostało znalezione
//        if (campaign.isPresent()) {
//            Product product = productRepository.findById(campaign.getProductId());
//            Town town = townRepository.findById(campaign.getTownId());
//            Keyword keyword = keywordRepository.findById(campaign.getKeywordId());
//
//            // Możesz dodać te dane do kampanii
//            product.ifPresent(campaign::setProduct);
//            town.ifPresent(campaign::setTown);
//            keyword.ifPresent(campaign::setKeyword);
//
//            return campaign;
//        } else {
//            // Zwróć odpowiedni błąd lub pusty wynik, jeśli kampania nie została znaleziona
//            // np. ResponseEntity.notFound().build() lub null
//            return null;
//
//
//        //return campaignRepository.findById(id)
//                       //.orElseThrow(() -> new CampaignNotFoundException(id));
//
//    }
    @GetMapping("/{id}")
    public CampaignProductTownKeywords getById(@PathVariable("id") Long id) {
//    // Fetch data from repositories
//    Optional<Campaign> campaign = campaignRepository.findById(id);
//    // Jeśli Campaign zostało znalezione
//    if (campaign != null) {
//        Optional<Product> product = productRepository.findById(campaign.get().getCampaignId());
//        Optional<Town> town = townRepository.findById(campaign.get().getTownId());
//
//        // Sprawdź, czy opcjonalne dane są dostępne i przypisz do kampanii
//        product.ifPresent(campaign::setProduct);
//        town.ifPresent(campaign::setTown);
//
//        return ResponseEntity.ok(campaign);
//    } else {
//        // Zwróć odpowiedni błąd jeśli kampania nie została znaleziona
//        return ResponseEntity.notFound().build();
//    }




//        CampaignProductTownKeywords campaignProductTownKeywords = new CampaignProductTownKeywords();
//        if (campaignProductTownKeywords != null) {
//            Optional<Campaign> campaign = campaignRepository.findById(id);
//            Optional<Product> product = productRepository.findById(campaign.get().getProductId());
//            Optional<Town> town = townRepository.findById(campaign.get().getTownId());
//
//            campaignProductTownKeywords.setCampaign(campaign.get());
//            campaignProductTownKeywords.setProduct(product.get());
//            campaignProductTownKeywords.setTown(town.get());
//
//            return ResponseEntity.ok(campaignProductTownKeywords);
//        } else {
//            return ResponseEntity.notFound().build();
//        }

// dobre
//
//        // Fetch data from repositories
//        Optional<Campaign> campaign = campaignRepository.findById(id);
//        // Jeśli Campaign zostało znalezione
//        if (campaign.isPresent()) {
//            Optional<Product> product = productRepository.findById(campaign.get().getProduct().getProductId());
//            Optional<Town> town = townRepository.findById(campaign.get().getTown().getTownId());
//
//            // Sprawdź, czy opcjonalne dane są dostępne i przypisz do kampanii
//            product.ifPresent(campaign.get()::setProduct);
//            town.ifPresent(campaign.get()::setTown);
//
//            return campaign.get();
//
//        } else {
//            throw new CampaignNotFoundException(id);
//        }

        List<Product> products = productRepository.findAll();
        List<Town> towns = townRepository.findAll();
        List<Keyword> keywords = keywordRepository.findAll();

        // Map data and return
        CampaignProductTownKeywords result = new CampaignProductTownKeywords();
        Optional<Campaign> campaign = campaignRepository.findById(id);
        // Jeśli Campaign zostało znalezione
        if (campaign.isPresent()) {
            Optional<Product> product = productRepository.findById(campaign.get().getProduct().getProductId());
            Optional<Town> town = townRepository.findById(campaign.get().getTown().getTownId());

            // Sprawdź, czy opcjonalne dane są dostępne i przypisz do kampanii
            product.ifPresent(campaign.get()::setProduct);
            town.ifPresent(campaign.get()::setTown);

            result.setCampaign(campaign.get());

        } else {
            throw new CampaignNotFoundException(id);
        }



        result.setTown(towns);
        result.setProduct(products);
        result.setKeyword(keywords);

        return result;

    }

    @PostMapping("/addCampaign")
    Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    @PutMapping("/{id}")
    Campaign updateCampaign(@RequestBody Campaign newCampaign, @PathVariable Long id) {
        return campaignRepository.findById(id)
                       .map(campaign -> {
                           campaign.setName(newCampaign.getName());
                           campaign.setKeywords(newCampaign.getKeywords());
                           campaign.setBidAmount(newCampaign.getBidAmount());
                           campaign.setFund(newCampaign.getFund());
                           campaign.setStatus(newCampaign.getStatus());
                           campaign.setTown(newCampaign.getTown());
                           campaign.setRadius(newCampaign.getRadius());
                           campaign.setAccountId(newCampaign.getAccountId());
                           campaign.setProduct(newCampaign.getProduct());

                           return campaignRepository.save(campaign);
                       })
                       .orElseThrow(() -> new CampaignNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    String deleteCampaign(@PathVariable Long id) {
        if (!campaignRepository.existsById(id))
            throw new CampaignNotFoundException(id);

        campaignRepository.deleteById(id);
        return "Campaign with id: " + id + " has been deleted";
    }
}
