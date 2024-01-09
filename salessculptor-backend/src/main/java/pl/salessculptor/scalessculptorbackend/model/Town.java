package pl.salessculptor.scalessculptorbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "Towns")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Town {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "town_id")
    private Long townId;

    @Column(name = "town_name")
    private String townName;
}

