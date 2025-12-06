package com.homeherolite.homeherolitep2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.homeherolite.homeherolitep2.domain.Prestador;

@Repository
public interface PrestadorRepository extends MongoRepository<Prestador, String>{
    
}
