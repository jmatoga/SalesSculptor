package pl.salessculptor.scalessculptorbackend.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import pl.salessculptor.scalessculptorbackend.model.Account;
import pl.salessculptor.scalessculptorbackend.model.Campaign;
import pl.salessculptor.scalessculptorbackend.repository.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class CampaignControllerTests {

    @Mock
    private CampaignRepository campaignRepository;

    @InjectMocks
    private CampaignController campaignController;

    @Test
    void testGetCampaignById() {
        Long id = 1L;
        Campaign campaign = new Campaign();
        campaign.setCampaignId(id);

        when(campaignRepository.findById(id)).thenReturn(Optional.of(campaign));

        Campaign returnedCampaign = campaignController.getCampaignById(id);

        assertEquals(campaign.getCampaignId(), returnedCampaign.getCampaignId());
    }

    @Test
    void testDeleteCampaign() {
        Long id = 1L;

        when(campaignRepository.existsById(id)).thenReturn(true);

        String deletionMessage = campaignController.deleteCampaign(id);

        assertNotNull(deletionMessage);
        assertTrue(deletionMessage.contains(String.valueOf(id)));
    }

}
