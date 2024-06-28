package com.synapse.connect.app.signaling_server;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.WebSocketSession;

public class Participant {
  private WebSocketSession session;
  private List<String> iceCandidates;

  public Participant() {}

  public Participant(WebSocketSession session) {
    this.session = session;
    this.iceCandidates = new ArrayList<>();
  }

  public List<String> getIceCandidates() {
    return iceCandidates;
  }
  public WebSocketSession getSession() {
    return session;
  }

  public void setIceCandidates(List<String> iceCandidates) {
    this.iceCandidates = iceCandidates;
  }
  public void setSession(WebSocketSession session) {
    this.session = session;
  }
}
