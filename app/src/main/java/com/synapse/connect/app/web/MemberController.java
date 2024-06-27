package com.synapse.connect.app.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.service.MemberService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {
  
  @Autowired
  MemberService memberService;

  @PostMapping("/create")
  public ResponseEntity<Map<String, Long>> createMember(@Valid @RequestBody Member member) {
    Member savedMember = memberService.saveMember(member);

    Map<String, Long> responeseMap = new HashMap<>();
    responeseMap.put("id", savedMember.getId());
    
    return new ResponseEntity<>(responeseMap, HttpStatus.CREATED);
  }

  @PostMapping("/validate")
  public ResponseEntity<Map<String, Long>> validateMember(@Valid @RequestBody Member member) {
    String name = member.getName();
    String email = member.getEmail();

    Map<String, Long> responseData = new HashMap<>();
    responseData.put("id", memberService.getMemberIdByNameAndEmail(name, email));

    return new ResponseEntity<>(responseData, HttpStatus.FOUND);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Member> getMember(@PathVariable Long id) {
    return new ResponseEntity<>(memberService.getMemberById(id), HttpStatus.OK);
  }
}
