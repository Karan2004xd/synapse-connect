package com.synapse.connect.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.synapse.connect.app.exception.ConstraintViolationException;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.exception.EntityNotFoundException;
import com.synapse.connect.app.repository.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberRepository memberRepository;

  @Override
  public void saveMember(Member member) {
    try {
      memberRepository.save(member);
    } catch (DataIntegrityViolationException e) {
      throw new ConstraintViolationException(e.getMessage());
    }
  }

  @Override
  public Member getMember(String name, String email) {
    Optional<Member> member = memberRepository.findByNameAndEmail(name, email);
    return unwrapMember(member);
  }

  @Override
  public boolean checkMember(Member member) {
    try {
      getMember(member.getName(), member.getEmail());
      return true;
    } catch (EntityNotFoundException e) {
      return false;
    }
  }

  static Member unwrapMember(Optional<Member> entity) {
    if (entity.isPresent()) return entity.get();
    else throw new EntityNotFoundException(Member.class);
  }
}
