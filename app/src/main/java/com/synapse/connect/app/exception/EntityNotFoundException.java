package com.synapse.connect.app.exception;

public class EntityNotFoundException extends RuntimeException {

  public EntityNotFoundException(Class<?> entity) {
    super("The entity was not found in our records");
  }
}
