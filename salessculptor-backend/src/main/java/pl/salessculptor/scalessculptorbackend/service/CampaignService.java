package pl.salessculptor.scalessculptorbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import pl.salessculptor.scalessculptorbackend.model.Campaign;
import pl.salessculptor.scalessculptorbackend.repository.CampaignRepository;

import java.util.List;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

//    @Query("SELECT c, p, t FROM Campaign c JOIN Product p on c.productId=p.productId JOIN Town t on c.townId=t.townId")
//    public List<String> getAllCampaigns() {
//        return campaignRepository.findAll();
//    }
//    // Inne metody usługi

}
