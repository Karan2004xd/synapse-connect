package com.synapse.connect.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.synapse.connect.app.entity.Member;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {

  @Query("SELECT m.id AS id FROM Member m WHERE m.name = :name AND m.email = :email")
  Optional<Long> findIdByNameAndEmail(@Param("name") String name,@Param("email") String email);

  Optional<Member> findById(Long id);
}
