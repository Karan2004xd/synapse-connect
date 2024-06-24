package com.synapse.connect.app.exception;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ErrorResponse {
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timestamp;
  private List<String> message;

  public ErrorResponse(List<String> message) {
    this.timestamp = LocalDateTime.now();
    this.message = message;
  }

  public List<String> getMessage() {
    return message;
  }
  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setMessage(List<String> message) {
    this.message = message;
  }
  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
