package pl.salessculptor.scalessculptorbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "campaigns")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaign {
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "town_id", referencedColumnName = "town_id")
    private Town town;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private Long campaignId;

//    @Column(name = "product_id")
//    private Long productId;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "campaign_name")
    private String name;

//    @ManyToMany
//    @JoinTable(
//            name = "CampaignKeywords",
//            joinColumns = @JoinColumn(name = "campaign_id"),
//            inverseJoinColumns = @JoinColumn(name = "keyword_id")
//    )
//    @Column(name = "keywords")
//    private Set<Keyword> keywords = new HashSet<>();

    @Column(name = "keywords")
    private String keywords;

    @Column(name = "bid_amount")
    private double bidAmount;

    @Column(name = "campaign_fund")
    private double fund;

    @Enumerated(EnumType.STRING)
    private CampaignStatus status;

//    @Column(name = "town_id")
//    private Long townId;

    @Column(name = "radius")
    private int radius;
}
