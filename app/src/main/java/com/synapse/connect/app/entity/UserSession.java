package com.synapse.connect.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_session", uniqueConstraints = {
  @UniqueConstraint(columnNames = {"member_id", "session_id"})
})
public class UserSession {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "member_id", referencedColumnName = "id")
  private Member member;

  @ManyToOne(optional = false)
  @JoinColumn(name = "session_id", referencedColumnName = "id")
  private Session session;

  public Long getId() {
    return id;
  }
  public Member getMember() {
    return member;
  }
  public Session getSession() {
    return session;
  }

  public void setSession(Session session) {
    this.session = session;
  }
  public void setMember(Member member) {
    this.member = member;
  }
  public void setId(Long id) {
    this.id = id;
  }
}
