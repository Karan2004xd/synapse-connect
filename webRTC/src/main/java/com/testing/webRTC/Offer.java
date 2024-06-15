package com.testing.webRTC;

import java.util.ArrayList;
import java.util.List;

public class Offer {
  private String offer;
  private List<String> iceCandidates = new ArrayList<>();
  private String answererId;
  private String offererId;
  private String answer;
  private List<String> answererIceCandidates = new ArrayList<>();

  public Offer() {}

  public Offer(String offererId, String offer) {
    this.offererId = offererId;
    this.offer = offer;
  }

  public Offer(String offer) {
    this.offer = offer;
  }

  public Offer(String offer, List<String> iceCandidates) {
    this.offer = offer;
    this.iceCandidates = iceCandidates;
  }

  public String getOffer() {
    return offer;
  }
  public List<String> getIceCandidates() {
    return iceCandidates;
  }
  public String getAnswer() {
    return answer;
  }
  public String getOffererId() {
    return offererId;
  }
  public String getAnswererId() {
    return answererId;
  }
  public List<String> getAnswererIceCandidates() {
    return answererIceCandidates;
  }

  public void setOffer(String offer) {
    this.offer = offer;
  }
  public void setIceCandidates(List<String> iceCandidates) {
    this.iceCandidates = iceCandidates;
  }
  public void setAnswer(String answer) {
    this.answer = answer;
  }
  public void setOffererId(String offererId) {
    this.offererId = offererId;
  }
  public void setAnswererId(String answererId) {
    this.answererId = answererId;
  }
  public void setAnswererIceCandidates(List<String> answererIceCandidates) {
    this.answererIceCandidates = answererIceCandidates;
  }
}
