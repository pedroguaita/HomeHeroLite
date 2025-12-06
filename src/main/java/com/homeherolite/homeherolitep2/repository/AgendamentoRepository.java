package com.homeherolite.homeherolitep2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.homeherolite.homeherolitep2.domain.Agendamento;

@Repository
public interface AgendamentoRepository extends MongoRepository<Agendamento, String>{
    
}
