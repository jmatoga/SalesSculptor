package pl.salessculptor.scalessculptorbackend.exception;

public class CampaignNotFoundException extends RuntimeException {
    public CampaignNotFoundException(Long id) {
        super("Could not find campaign with id: " + id);
    }
}
