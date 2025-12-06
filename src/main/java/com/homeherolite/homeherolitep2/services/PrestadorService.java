package com.homeherolite.homeherolitep2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.repository.PrestadorRepository;
import com.homeherolite.homeherolitep2.domain.Prestador;

@Service
public class PrestadorService {
    
    @Autowired //vai instanciar automaticamente -> injeção de dependência automática.
    private PrestadorRepository repo;

    public List<Prestador> listarPrestadores(){
        return repo.findAll();
    }
}
