package pl.salessculptor.scalessculptorbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pl.salessculptor.scalessculptorbackend.exception.CampaignNotFoundException;
import pl.salessculptor.scalessculptorbackend.model.*;
import pl.salessculptor.scalessculptorbackend.repository.*;

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

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/campaignProductTown")
    public CampaignProductTownKeywords getCampaignProductTown() {
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

    @GetMapping("withDropDownListOptions/{id}")
    public CampaignProductTownKeywords getById(@PathVariable("id") Long id) {
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

        List<Account> accounts = accountRepository.findAll();

        // Map data and return
        CampaignProductTownKeywords result = new CampaignProductTownKeywords();
        Optional<Campaign> campaign = campaignRepository.findById(id);
        // Jeśli Campaign zostało znalezione
        if (campaign.isPresent()) {
            Optional<Product> product = productRepository.findById(campaign.get().getProduct().getProductId());
            Optional<Town> town = townRepository.findById(campaign.get().getTown().getTownId());
            //Optional<Town> town = townRepository.findById(campaign.get().getTown().getTownId());

            // Sprawdź, czy opcjonalne dane są dostępne i przypisz do kampanii
            product.ifPresent(campaign.get()::setProduct);
            town.ifPresent(campaign.get()::setTown);
            //accounts.set(setAccount);

            result.setCampaign(campaign.get());

        } else {
            throw new CampaignNotFoundException(id);
        }



        result.setTown(towns);
        result.setProduct(products);
        result.setKeyword(keywords);

        return result;

    }


    @GetMapping("/{id}")
    Campaign getCampaignById(@PathVariable Long id) {
        return campaignRepository.findById(id)
                       .orElseThrow(() -> new CampaignNotFoundException(id));
    }

    @PostMapping("/addCampaign")
    Campaign createCampaign(@RequestBody Campaign campaign) {
        updateBalance(campaign);
        return campaignRepository.save(campaign);
    }

    private Account updateBalance(@RequestBody Campaign campaign) {
        return accountRepository.findById(campaign.getAccount().getAccountId())
                .map(account -> {
                    account.setBalance(campaign.getAccount().getBalance());

                    return accountRepository.save(account);
                })
                .orElseThrow(() -> new CampaignNotFoundException(campaign.getAccount().getAccountId()));
    }

    @PutMapping("/{id}")
    Campaign updateCampaign(@RequestBody Campaign newCampaign, @PathVariable Long id) {
        updateBalance(newCampaign);
        return campaignRepository.findById(id)
                       .map(campaign -> {
                           campaign.setName(newCampaign.getName());
                           campaign.setKeywords(newCampaign.getKeywords());
                           campaign.setBidAmount(newCampaign.getBidAmount());
                           campaign.setFund(newCampaign.getFund());
                           campaign.setStatus(newCampaign.getStatus());
                           campaign.setTown(newCampaign.getTown());
                           campaign.setRadius(newCampaign.getRadius());
                           campaign.setAccount(newCampaign.getAccount());
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
