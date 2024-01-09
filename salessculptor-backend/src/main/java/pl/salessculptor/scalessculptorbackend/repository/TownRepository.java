package pl.salessculptor.scalessculptorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.salessculptor.scalessculptorbackend.model.Campaign;
import pl.salessculptor.scalessculptorbackend.model.CampaignStatus;
import pl.salessculptor.scalessculptorbackend.model.Town;

import java.util.List;

@Repository
public interface TownRepository extends JpaRepository<Town, Long> {

}
