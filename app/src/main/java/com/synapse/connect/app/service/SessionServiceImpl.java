package com.synapse.connect.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.synapse.connect.app.entity.Member;
import com.synapse.connect.app.entity.Session;
import com.synapse.connect.app.exception.ConstraintViolationException;
import com.synapse.connect.app.repository.SessionRepository;
import com.synapse.connect.app.repository.MemberRepository;
import com.synapse.connect.app.utils.AESEncryptorUtil;
import com.synapse.connect.app.utils.EntityUtil;

@Service
public class SessionServiceImpl implements SessionService {
  @Autowired
  SessionRepository sessionRepository;

  @Autowired
  MemberRepository memberRepository;

  private String getNewLink(String oldLink, Long hostId) {
    Member hostMemberObj = EntityUtil.unwrap(memberRepository.findById(hostId), Member.class);
    String hostName = hostMemberObj.getName();
    return oldLink + hostName;
  }

  // saveSession helper method
  private Session getToSaveSession(Session responseSession) {
    Session toSaveSession = new Session(responseSession);

    String input = responseSession.getSessionPassword();
    String secretKey = getNewLink(responseSession.getSessionLink(), responseSession.getHostId());

    toSaveSession.setSessionPassword(AESEncryptorUtil.encrypt(input, secretKey));
    return toSaveSession;
  }

  @Override
  public Session saveSession(Session session) {
    try {
      sessionRepository.save(getToSaveSession(session));
    } catch (DataIntegrityViolationException e) {
      throw new ConstraintViolationException(e.getMessage());
    }
    return session;
  }
}
