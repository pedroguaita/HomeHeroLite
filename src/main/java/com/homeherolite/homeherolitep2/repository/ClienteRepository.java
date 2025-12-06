package com.homeherolite.homeherolitep2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.homeherolite.homeherolitep2.domain.Cliente;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String>{
    
}
