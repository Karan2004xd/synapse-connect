package com.synapse.connect.app.signaling_server;

import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.synapse.connect.app.utils.Constants;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SignalingServerHandlerService extends TextWebSocketHandler {
  private Map<String, List<Participant>> meetingRooms = new ConcurrentHashMap<>();
  private ObjectMapper objectMapper = new ObjectMapper();

  private void handleNewConnection(WebSocketSession session, String sessionLink) throws Exception {
    Participant participant = new Participant(session);

    if (!meetingRooms.containsKey(sessionLink)) {
      List<Participant> participants = new ArrayList<>();
      participants.add(participant);
      meetingRooms.put(sessionLink, participants);
    } else {
      meetingRooms.get(sessionLink).add(participant);
    }

    Map<String, String> responseMap = new ConcurrentHashMap<>();
    responseMap.put(Constants.TYPE, Constants.NEW_USER);
    responseMap.put(Constants.SESSION_ID, session.getId());

    System.out.println("Handle new connection: " + session.getId());
    session.sendMessage(new TextMessage(objectMapper.writeValueAsString(responseMap)));

    System.out.println("New Connection Created");
  }

  private void handleCreateOffer(String sessionLink, TextMessage message, String sessionId) throws Exception {
    for (Participant p : meetingRooms.get(sessionLink)) {
      WebSocketSession session = p.getSession();
      System.out.println(sessionId);
      System.out.println(session.getId());

      if (!session.getId().equals(sessionId)) {
        System.out.println("Create connection: " + session.getId());
        session.sendMessage(message);
      }
    }
  }

  private void handleNewIceCandidate(String sessionLink, String iceCandidate, String sessionId) {
    for (Participant p : meetingRooms.get(sessionLink)) {
      String participantSessionId = p.getSession().getId();

      if (participantSessionId.equals(sessionId)) {
        p.getIceCandidates().add(iceCandidate);
      }
    }
  }

  private Participant getParticipantById(String id, String sessionLink) {
    for (Participant p : meetingRooms.get(sessionLink)) {
      if (p.getSession().getId().equals(id)) {
        return p;
      }
    }
    return null;
  }

  private void handleAddOffererIceCandidates(String sessionLink, String offererId, String answererId) throws Exception {
    Map<String, Object> responseMap = new ConcurrentHashMap<>();
    responseMap.put(Constants.TYPE, Constants.ADD_OFFERER_ICE_CANDIDATES);

    Participant offererParticipant = getParticipantById(offererId, sessionLink);
    responseMap.put(Constants.ICE_CANDIDATES, offererParticipant.getIceCandidates());

    String responsePayload = objectMapper.writeValueAsString(responseMap);
    WebSocketSession answererSession = getParticipantById(answererId, sessionLink).getSession();

    answererSession.sendMessage(new TextMessage(responsePayload));
  }

  private void handleAnswerAnswererOffer(String sessionLink, String answererId, TextMessage message) throws Exception {
    WebSocketSession answererSession = getParticipantById(answererId, sessionLink).getSession();
    answererSession.sendMessage(message);
  }

  private void handleCloseConnection(String sessionLink, String sessionId) {
    meetingRooms.get(sessionLink).remove(getParticipantById(sessionId, sessionLink));
    System.out.println("Connection Closed: " + sessionId);
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    String payload = message.getPayload();
    Map<String, String> msg = objectMapper.readValue(payload, Map.class);

    String requestType = msg.get(Constants.TYPE);
    String sessionLink = msg.get(Constants.SESSION_LINK);
    String sessionId;

    System.out.println(sessionLink);
    System.out.println(requestType);

    switch (requestType) {
      case Constants.NEW_CONNECTION:
        handleNewConnection(session, sessionLink);
        break;

      case Constants.CREATE_OFFER:
        sessionId = msg.get(Constants.SESSION_ID);
        System.out.println("Create new connection: " + session.getId());
        handleCreateOffer(sessionLink, message, sessionId);
        break;

      case Constants.NEW_ICE_CANDIDATE:
        String iceCandidate = msg.get(Constants.ICE_CANDIDATE);
        sessionId = msg.get(Constants.SESSION_ID);
        handleNewIceCandidate(sessionLink, iceCandidate, sessionId);
        break;

      case Constants.ADD_OFFERER_ICE_CANDIDATES:
        String offererId = msg.get(Constants.OFFERER_ID);
        String answererId = msg.get(Constants.ANSWERER_ID);

        handleAddOffererIceCandidates(sessionLink, offererId, answererId);
        break;

      case Constants.ANSWER_ANSWERER_OFFER:
        answererId = msg.get(Constants.ANSWERER_ID);
        handleAnswerAnswererOffer(sessionLink, answererId, message);
        break;

      case Constants.CLOSE_CONNECTION:
        sessionId = msg.get(Constants.SESSION_ID);
        handleCloseConnection(sessionLink, sessionId);
        break;

      default:
        break;
    }
  }
}
