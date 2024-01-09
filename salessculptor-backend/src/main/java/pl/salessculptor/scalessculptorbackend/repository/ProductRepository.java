package pl.salessculptor.scalessculptorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.salessculptor.scalessculptorbackend.model.Product;
import pl.salessculptor.scalessculptorbackend.model.Town;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}