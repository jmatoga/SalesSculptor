package pl.salessculptor.scalessculptorbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Campaigns")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private Long campaignId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "town_id", referencedColumnName = "town_id")
    private Town town;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", referencedColumnName = "account_id")
    private Account account;

    @Column(name = "campaign_name")
    private String name;

    @Column(name = "keywords")
    private String keywords;

    @Column(name = "bid_amount")
    private double bidAmount;

    @Column(name = "campaign_fund")
    private double fund;

    @Enumerated(EnumType.STRING)
    private CampaignStatus status;

    @Column(name = "radius")
    private int radius;
}
