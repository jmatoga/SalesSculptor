package pl.salessculptor.scalessculptorbackend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import pl.salessculptor.scalessculptorbackend.controller.ProductController;
import pl.salessculptor.scalessculptorbackend.model.Product;
import pl.salessculptor.scalessculptorbackend.repository.ProductRepository;

@SpringBootTest
public class ProductControllerTests {

    @Test
    public void testGetAllProducts() {
        // Mocking the repository
        ProductRepository mockRepository = mock(ProductRepository.class);

        List<Product> expectedProducts = Arrays.asList(
                new Product(1L, "Product1", "Description1", 1.0),
                new Product(2L, "Product2", "Description2", 2.0),
                new Product(3L, "Product3", "Description3", 3.0)
        );

        when(mockRepository.findAll()).thenReturn(expectedProducts);

        // Creating the controller instance
        ProductController productController = new ProductController();
        productController.productRepository = mockRepository;

        // Testing the method
        List<Product> actualProducts = productController.getAllProducts();

        // Assertion
        assertEquals(expectedProducts.size(), actualProducts.size());
    }
}
