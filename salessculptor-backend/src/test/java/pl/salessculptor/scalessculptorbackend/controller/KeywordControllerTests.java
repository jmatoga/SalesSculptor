package pl.salessculptor.scalessculptorbackend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import pl.salessculptor.scalessculptorbackend.model.Keyword;
import pl.salessculptor.scalessculptorbackend.repository.KeywordRepository;

@SpringBootTest
public class KeywordControllerTests {

    @Test
    public void testGetAllKeywords() {
        // Mocking the repository
        KeywordRepository mockRepository = mock(KeywordRepository.class);

        List<Keyword> expectedKeywords = Arrays.asList(
                new Keyword(1L,"Electronics"),
                new Keyword(2L,"Limited Time"),
                new Keyword(3L,"Special Offer")
        );

        when(mockRepository.findAll()).thenReturn(expectedKeywords);

        // Creating the controller instance
        KeywordController keywordController = new KeywordController();
        keywordController.keywordRepository = mockRepository;

        // Testing the method
        List<Keyword> actualKeywords = keywordController.getAllKeywords();

        // Assertion
        assertEquals(expectedKeywords.size(), actualKeywords.size());
    }
}
