package com.synapse.connect.app.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "session")
public class Session {

  @Transient
  private final String DEFAULT_ENDPOINT = "localhost::8080/session/";
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @NotBlank(message = "A session name is required!")
  @Column(name = "session_name", nullable = false, unique = true)
  private String sessionName;

  @Column(name = "session_link")
  private String sessionLink;

  @Column(name = "session_password", nullable = false)
  private String sessionPassword;

  // @ManyToOne(optional = false)
  // @JoinColumn(name = "host_id", referencedColumnName = "id")
  // private Member host;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "start_time")
  private LocalDateTime startTime = LocalDateTime.now();

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "end_time")
  private LocalDateTime endTime = LocalDateTime.now();
  
  @Temporal(TemporalType.DATE)
  @Column(name = "created_on")
  private Date createdOn = new Date();

  @Column(name = "total_time")
  private Long totalTime;

  @Column(name = "host_id", nullable = false)
  private Long hostId;

  public Session(String sessionName, String sessionPassword, Long hostId) {
    sessionName = sessionName.replaceAll("\\s", "");
    this.sessionName = sessionName;
    this.sessionLink = DEFAULT_ENDPOINT + sessionName + "-" + UUID.randomUUID().toString();
    this.sessionPassword = sessionPassword;
    this.hostId = hostId;
  }

  public Session(Session other) {
    this.sessionName = other.sessionName;
    this.sessionLink = other.sessionLink;
    this.sessionPassword = other.sessionPassword;
    this.hostId = other.hostId;
  }

  public Long getHostId() {
    return hostId;
  }
  public LocalDateTime getEndTime() {
    return endTime;
  }
  public Long getId() {
    return id;
  }
  public Date getCreatedOn() {
    return createdOn;
  }
  public String getSessionLink() {
    return sessionLink;
  }
  public String getSessionName() {
    return sessionName;
  }
  public LocalDateTime getStartTime() {
    return startTime;
  }
  public Long getTotalTime() {
    return totalTime;
  }
  public String getSessionPassword() {
    return sessionPassword;
  }

  public void setId(Long id) {
    this.id = id;
  }
  public void setEndTime(LocalDateTime endTime) {
    this.endTime = endTime;
  }
  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }
  public void setTotalTime(Long totalTime) {
    this.totalTime = totalTime;
  }
  public void setSessionLink(String sessionLink) {
    this.sessionLink = sessionLink;
  }
  public void setSessionName(String sessionName) {
    this.sessionName = sessionName;
  }
  public void setSessionPassword(String sessionPassword) {
    this.sessionPassword = sessionPassword;
  }
  public void setCreatedOn(Date createdOn) {
    this.createdOn = createdOn;
  }
  public void setHostId(Long hostId) {
    this.hostId = hostId;
  }
}
