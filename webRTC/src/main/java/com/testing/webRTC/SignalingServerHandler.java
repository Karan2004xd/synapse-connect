package com.testing.webRTC;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SignalingServerHandler extends TextWebSocketHandler {
  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
  }
}
