package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.repository.AgendamentoRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;
import com.homeherolite.homeherolitep2.domain.Agendamento;

@Service
public class AgendamentoService {
    
    @Autowired //vai instanciar automaticamente -> injeção de dependência automática.
    private AgendamentoRepository repo;

    public List<Agendamento> listarAgendamentos(){
        return repo.findAll();
    }

    public Agendamento buscarId(String id) {
        Optional<Agendamento> obj = repo.findById(id);
        return obj.orElseThrow(() -> 
            new ObjectNotFoundException("Agendamento não encontrado."));
    }
}
