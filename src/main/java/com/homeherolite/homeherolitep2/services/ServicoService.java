package com.homeherolite.homeherolitep2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.repository.ServicoRepository;
import com.homeherolite.homeherolitep2.domain.Servico;

@Service
public class ServicoService {
    
    @Autowired //vai instanciar automaticamente -> injeção de dependência automática.
    private ServicoRepository repo;

    public List<Servico> listarServicos(){
        return repo.findAll();
    }
}
