package com.synapse.connect.app.service;

import com.synapse.connect.app.entity.Member;

public interface MemberService {
  Member saveMember(Member member);
  Long getMemberIdByNameAndEmail(String name, String email);
  Member getMemberById(Long id);
}
