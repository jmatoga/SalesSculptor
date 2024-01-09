package pl.salessculptor.scalessculptorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.salessculptor.scalessculptorbackend.model.Account;
import pl.salessculptor.scalessculptorbackend.model.Town;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("SELECT p FROM Product p ")
    List<Town> findActiveCampaigns();

}