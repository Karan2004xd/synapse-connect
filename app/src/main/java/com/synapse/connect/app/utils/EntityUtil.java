package com.synapse.connect.app.utils;

import java.util.Optional;

import com.synapse.connect.app.exception.EntityNotFoundException;

public class EntityUtil {
  public static <T> T unwrap(Optional<T> entity, Class<T> entityClass) {
    if (entity.isPresent()) return entity.get();
    else throw new EntityNotFoundException(entityClass);
  }
}
