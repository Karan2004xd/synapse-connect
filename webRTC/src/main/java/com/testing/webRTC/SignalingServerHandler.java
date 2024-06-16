package com.testing.webRTC;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SignalingServerHandler extends TextWebSocketHandler {
  private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
  private final Map<String, Offer> offers = new ConcurrentHashMap<>();
  private final Map<String, List<String>> iceCandidates = new ConcurrentHashMap<>();
  private ObjectMapper objectMapper = new ObjectMapper();

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String payload = message.getPayload();
    Map<String, String> msg = objectMapper.readValue(payload, Map.class);
    String type = msg.get("type");

    System.out.println(type);

    if (type.equals("ice-candidate")) {
      String iceCandidate = msg.get("iceCandidate");

      String id = session.getId();

      if (!iceCandidates.containsKey(id)) {
        List<String> list = new ArrayList<>(); 
        list.add(iceCandidate);
        iceCandidates.put(id, list);
      } else {
        iceCandidates.get(id).add(iceCandidate);
      }
    } 
    // else if (type.equals("create-offer")) {
    //   String offer = msg.get("offer");
    //   Map<String, Object> map = new ConcurrentHashMap<>();
    //   map.put("type", "create-offer");
    //   map.put("offer", offer);

    //   List<String> resultIceCandidates = new ArrayList<>();
    //   if (iceCandidates.containsKey(session.getId())) {
    //     resultIceCandidates = iceCandidates.get(session.getId());
    //   }
    //   map.put("iceCandidates", resultIceCandidates);

    //   payload = objectMapper.writeValueAsString(map);
    // }

    for (WebSocketSession s : sessions.values()) {
      if (!s.getId().equals(session.getId())) {
        s.sendMessage(new TextMessage(payload));
      }
    }
  }

  private void handleIceCandidate(String id, String didIOffer, String candidate) {
    if (didIOffer == "true") {
      Offer offer = offers.get(id);
      if (offer != null) {
        offer.getIceCandidates().add(candidate);
        offer.getIceCandidates().size();

      } else {
        System.out.println("Offer is null");
      }
    } else if (didIOffer == "false") {

    }
  }

  private void addNewOffers(String offer, String id) {
    Offer newOffer = new Offer(id, offer);
    offers.put(id, newOffer);
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    System.out.println("New Session started");
    sessions.put(session.getId(), session);

    Map<String, String> map = new ConcurrentHashMap<>();
    map.put("type", "new-user");
    map.put("id", session.getId());

    try {
      String jsonString = objectMapper.writeValueAsString(map);
      System.out.println(jsonString);
      session.sendMessage(new TextMessage(jsonString));
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session.getId());
    System.out.println("Session closed");
  }
}
