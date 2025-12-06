package com.homeherolite.homeherolitep2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.repository.AgendamentoRepository;
import com.homeherolite.homeherolitep2.domain.Agendamento;

@Service
public class AgendamentoService {
    
    @Autowired //vai instanciar automaticamente -> injeção de dependência automática.
    private AgendamentoRepository repo;

    public List<Agendamento> listarAgendamentos(){
        return repo.findAll();
    }
}
