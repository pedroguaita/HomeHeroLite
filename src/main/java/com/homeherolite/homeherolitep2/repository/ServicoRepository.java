package com.homeherolite.homeherolitep2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.homeherolite.homeherolitep2.domain.Servico;

@Repository
public interface ServicoRepository extends MongoRepository<Servico, String>{
    
}
