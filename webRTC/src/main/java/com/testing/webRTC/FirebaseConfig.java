package com.testing.webRTC;

import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

  @Bean
  public FirebaseApp firebaseApp() throws Exception {
    Resource resource = new ClassPathResource("syanpse-connect-firebase-adminsdk-1kqzz-60422fb014.json");
    InputStream serviceAccount = resource.getInputStream();
    // FileInputStream serviceAccount = new FileInputStream("syanpse-connect-firebase-adminsdk-1kqzz-60422fb014.json");

    FirebaseOptions options = FirebaseOptions.builder()
      .setCredentials(GoogleCredentials.fromStream(serviceAccount))
      .build();

    return FirebaseApp.initializeApp(options);
  } 
}
