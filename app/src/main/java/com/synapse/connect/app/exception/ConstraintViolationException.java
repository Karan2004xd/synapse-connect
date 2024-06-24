package com.synapse.connect.app.exception;

public class ConstraintViolationException extends RuntimeException {
  public ConstraintViolationException(String error) {
    super("MySQL Contraint Violation detected, \n\rError: " + error);
  }
}
