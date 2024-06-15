package com.testing.webRTC;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SignalingServerHandler extends TextWebSocketHandler {
  private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

  private Map<String, String> parseMessage(String payload) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    Map<String, String> map = mapper.readValue(payload, Map.class);
    return map;
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String payload = message.getPayload();
    Map<String, String> msg = parseMessage(payload);

    String targetPeerId = msg.get("targetPeerId");
    WebSocketSession targetSession = sessions.get(targetPeerId);

    if (targetSession != null && targetSession.isOpen()) {
      targetSession.sendMessage(new TextMessage(payload));
    }
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    System.out.println("New Session started");
    sessions.put(session.getId(), session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    sessions.remove(session.getId());
    System.out.println("Session closed");
  }
}
