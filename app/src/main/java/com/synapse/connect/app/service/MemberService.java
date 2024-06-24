package com.synapse.connect.app.service;

import com.synapse.connect.app.entity.Member;

public interface MemberService {
  void saveMember(Member member);
  Member getMember(String name, String email);
  boolean checkMember(Member member);
}
