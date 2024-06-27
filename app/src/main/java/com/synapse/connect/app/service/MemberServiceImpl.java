package com.synapse.connect.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.synapse.connect.app.exception.ConstraintViolationException;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.repository.MemberRepository;
import com.synapse.connect.app.utils.EntityUtil;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberRepository memberRepository;

  @Override
  public Member saveMember(Member member) {
    try {
      return memberRepository.save(member);
    } catch (DataIntegrityViolationException e) {
      throw new ConstraintViolationException(e.getMessage());
    }
  }

  @Override
  public Long getMemberIdByNameAndEmail(String name, String email) {
    Optional<Long> member = memberRepository.findIdByNameAndEmail(name, email);
    return EntityUtil.unwrap(member, Long.class);
  }

  @Override
  public Member getMemberById(Long id) {
    Optional<Member> member = memberRepository.findById(id);
    return EntityUtil.unwrap(member, Member.class);
  }
}
