package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.repository.PrestadorRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;
import com.homeherolite.homeherolitep2.domain.Prestador;

@Service
public class PrestadorService {
    
    @Autowired //vai instanciar automaticamente -> injeção de dependência automática.
    private PrestadorRepository repo;

    public List<Prestador> listarPrestadores(){
        return repo.findAll();
    }

    public Prestador buscarId(String id) {
        Optional<Prestador> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Prestador não encontrado."));
    }
}
