package pl.salessculptor.scalessculptorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.salessculptor.scalessculptorbackend.model.Campaign;
import pl.salessculptor.scalessculptorbackend.model.CampaignStatus;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    @Query("SELECT c FROM Campaign c WHERE c.status = 'ON'")
    List<Campaign> findActiveCampaigns();

    List<Campaign> findByStatus(CampaignStatus status);
}
