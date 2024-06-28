package com.synapse.connect.app.repository;

import org.springframework.data.repository.CrudRepository;

import com.synapse.connect.app.entity.UserSession;

public interface UserSessionRespository extends CrudRepository<UserSession, Long> {
}
