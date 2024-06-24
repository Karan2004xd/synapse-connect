package com.synapse.connect.app.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.synapse.connect.app.entity.Member;

public interface MemberRepository extends CrudRepository<Member, Long> {
  Optional<Member> findByNameAndEmail(String name, String email);
}
