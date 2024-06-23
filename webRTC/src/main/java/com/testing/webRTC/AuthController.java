package com.testing.webRTC;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private FirebaseAuthService authService;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody UserRequest userRequest) {
    try {
      String email = userRequest.getEmail();
      String password = userRequest.getPassword();

      String uid = authService.createUser(email, password);
      return ResponseEntity.ok("User created with UID " + uid);
    } catch (Exception e) {
      return ResponseEntity.status(400).body("Error creating user: " + e.getMessage());
    }
  }

  @GetMapping("/user/{email}")
  public ResponseEntity<Object> getUserByEmail(@PathVariable String email) {
    try {
      return ResponseEntity.ok(authService.getUserByEmail(email));
    } catch (Exception e) {
      return ResponseEntity.status(400).body("Error fetching user: " + e.getMessage());
    }
  }
}
