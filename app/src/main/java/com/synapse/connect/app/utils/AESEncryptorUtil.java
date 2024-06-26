package com.synapse.connect.app.utils;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class AESEncryptorUtil {
  private static final String PADDING = "AES/ECB/PKCS5Padding";
  private static final String ENCRYPTION_ALGORITHM = "AES";

  private static SecretKey getSecretKey(String secretKey) {
    byte[] keyBytes = Arrays.copyOf(secretKey.getBytes(StandardCharsets.UTF_8), 32);
    return new SecretKeySpec(keyBytes, ENCRYPTION_ALGORITHM);
  }

  private static byte[] generateEncryptedData(String input, SecretKey secretKey) throws Exception {
    Cipher cipher = Cipher.getInstance(PADDING);
    cipher.init(Cipher.ENCRYPT_MODE, secretKey);
    return cipher.doFinal(input.getBytes(StandardCharsets.UTF_8));
  }

  private static String encodeToBase64(byte[] encryptedBytes) {
    return Base64.getEncoder().encodeToString(encryptedBytes);
  }

  public static String encrypt(String input, String secretKey) {
    SecretKey finalSecretKey = getSecretKey(secretKey);
    try {
      byte[] encryptedBytes = generateEncryptedData(input, finalSecretKey);
      return encodeToBase64(encryptedBytes);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return null;
    }
  }
}
