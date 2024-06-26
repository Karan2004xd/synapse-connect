package com.synapse.connect.app.exception;

public class ConstraintViolationException extends RuntimeException {
  public ConstraintViolationException(String error) {
    super("Ivalid request format or the data provided already exists");
    // System.out.println(error);
  }
}
