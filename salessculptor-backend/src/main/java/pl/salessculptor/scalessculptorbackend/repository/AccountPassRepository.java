package pl.salessculptor.scalessculptorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.salessculptor.scalessculptorbackend.model.AccountPass;

@Repository
public interface AccountPassRepository extends JpaRepository<AccountPass, Long> {
    AccountPass findByUsername(String username);
}

