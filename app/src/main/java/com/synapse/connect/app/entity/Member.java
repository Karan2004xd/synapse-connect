package com.synapse.connect.app.entity;

import java.util.Date;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "member")
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @NotNull(message = "Cannot be null")
  @Column(name = "name", nullable = false)
  private String name;

  @NotNull(message = "Cannot be null")
  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Temporal(TemporalType.DATE)
  @Column(name = "created_at")
  private Date createdAt = new Date();

  public Member() {}

  public Member(String name, String email) {
    this.name = name;
    this.email = email;
  }

  public String getEmail() {
    return email;
  }
  public Long getId() {
    return id;
  }
  public String getName() {
    return name;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public void setId(Long id) {
    this.id = id;
  }
}
