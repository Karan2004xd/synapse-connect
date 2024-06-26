package com.synapse.connect.app.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.entity.Session;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {
  Optional<String> findNameByHostId(Member hostId);
}
