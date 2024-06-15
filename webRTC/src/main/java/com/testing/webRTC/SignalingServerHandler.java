package com.testing.webRTC;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class SignalingServerHandler extends TextWebSocketHandler {
  private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String payload = message.getPayload();
    for (WebSocketSession session2 : sessions.values()) {
      if (!session2.getId().equals(session.getId())) {
        session2.sendMessage(new TextMessage(payload));
      }
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
