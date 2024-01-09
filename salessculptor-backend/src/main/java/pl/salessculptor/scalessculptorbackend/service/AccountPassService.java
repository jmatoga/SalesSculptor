package pl.salessculptor.scalessculptorbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.salessculptor.scalessculptorbackend.model.AccountPass;
import pl.salessculptor.scalessculptorbackend.repository.AccountPassRepository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@Transactional
public class AccountPassService {

    @Autowired
    private AccountPassRepository accountPassRepository;

    public boolean authenticateUser(String username, String password) {
        AccountPass accountPass = accountPassRepository.findByUsername(username);

        // username not found
        if (accountPass == null) {
            return false;
        }

        String hashedPasswordToCompare = hashPasswordWithSalt(password, accountPass.getSalt());
        return hashedPasswordToCompare.equals(accountPass.getPasswordHash());
    }

    // Method to hash with salt (SHA-256)
    private String hashPasswordWithSalt(String password, String salt) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            String saltedPassword = password + salt;
            byte[] hashBytes = messageDigest.digest(saltedPassword.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Method to generate a random salt
//    public String generateSalt() {
//        SecureRandom random = new SecureRandom();
//        byte[] saltBytes = new byte[16]; // Length of salt
//        random.nextBytes(saltBytes);
//        return bytesToHex(saltBytes);
//    }

    // Metoda konwertująca bajty na heksadecymalny ciąg znaków
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}

