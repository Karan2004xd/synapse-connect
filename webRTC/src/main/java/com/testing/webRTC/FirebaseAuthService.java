package com.testing.webRTC;

import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;

@Service
public class FirebaseAuthService {
  public String createUser(String email, String password) throws Exception {
    UserRecord.CreateRequest request = new UserRecord.CreateRequest()
      .setEmail(email)
      .setPassword(password);

    UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
    return userRecord.getUid();
  }

  public UserRecord getUserByEmail(String email) throws Exception {
    return FirebaseAuth.getInstance().getUserByEmail(email);
  }
}
