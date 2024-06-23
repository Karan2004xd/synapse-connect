package com.testing.webRTC;

public class UserRequest {
  private String email;
  private String password;

  public UserRequest() {}

  public UserRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return email;
  }
  public String getPassword() {
    return password;
  }
}
