package pl.salessculptor.scalessculptorbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignWithAccount {
    private Campaign campaign;
    private Account account;
}
