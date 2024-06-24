package com.synapse.connect.app.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.service.MemberService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/member")
public class MemberController {
  
  @Autowired
  MemberService memberService;

  @PostMapping("/confirm")
  public ResponseEntity<HttpStatus> confirmMember(@Valid @RequestBody Member member) {
    HttpStatus result = HttpStatus.FOUND;

    if (!memberService.checkMember(member)) {
      memberService.saveMember(new Member(member.getName(), member.getEmail()));
      result = HttpStatus.CREATED;
    }

    return new ResponseEntity<>(result);
  }
}
