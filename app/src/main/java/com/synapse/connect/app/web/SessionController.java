package com.synapse.connect.app.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synapse.connect.app.entity.Session;
import com.synapse.connect.app.service.SessionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/session")
public class SessionController {

  @Autowired
  SessionService sessionService;

  @PostMapping("/create")
  public ResponseEntity<Map<String, String>> createNewSession(@Valid @RequestBody Session session) {

    Map<String, String> responseMap = new HashMap<>();
    Session savedSession = sessionService.saveSession(session);

    String sessionLink = savedSession.getSessionLink();
    String sessionPassword = savedSession.getSessionPassword();

    responseMap.put("session_link", sessionLink);
    responseMap.put("session_password", sessionPassword);

    return new ResponseEntity<>(responseMap, HttpStatus.CREATED);
  }
}
