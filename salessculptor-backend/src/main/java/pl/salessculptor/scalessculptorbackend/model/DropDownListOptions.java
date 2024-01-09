package pl.salessculptor.scalessculptorbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DropDownListOptions {
    private List<Product> product;
    private List<Town> town;
    private List<Keyword> keyword;
    private List<Account> account;

}
