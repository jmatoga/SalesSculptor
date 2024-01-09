package pl.salessculptor.scalessculptorbackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import pl.salessculptor.scalessculptorbackend.model.Town;
import pl.salessculptor.scalessculptorbackend.repository.TownRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TownControllerTests {

    @Test
    public void testGetAllTowns() {
        // Mocking the repository
        TownRepository mockRepository = mock(TownRepository.class);

        List<Town> expectedTowns = Arrays.asList(
                new Town(1L,"Town1"),
                new Town(2L,"Town2"),
                new Town(3L,"Town3")
        );

        when(mockRepository.findAll()).thenReturn(expectedTowns);

        // Creating the controller instance
        TownController townController = new TownController();
        townController.townRepository = mockRepository;

        // Testing the method
        List<Town> actualTowns = townController.getAllTowns();

        // Assertion
        assertEquals(expectedTowns.size(), actualTowns.size());
    }
}

