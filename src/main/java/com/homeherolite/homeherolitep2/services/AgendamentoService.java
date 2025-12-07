package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Agendamento;
import com.homeherolite.homeherolitep2.dto.AgendamentoDTO;
import com.homeherolite.homeherolitep2.repository.AgendamentoRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

@Service
public class AgendamentoService {

    @Autowired // vai instanciar automaticamente ->injeção de dependência automática.
    private AgendamentoRepository repo;

    // método para listar agendamentos
    public List<Agendamento> listarAgendamentos() {
        return repo.findAll();
    }

    // Método para buscar um agendamento por ID
    public Agendamento buscarId(String id) {
        Optional<Agendamento> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Agendamento não encontrado."));
    }

    // método para inserir um agendamento
    public Agendamento inserir(Agendamento obj) {
        return repo.insert(obj);
    }

    // conversão de DTO para entidade
    public Agendamento fromDTO(AgendamentoDTO objDto) {
        return new Agendamento(
                objDto.getId(),
                objDto.getData(),
                objDto.getHorario(),
                objDto.getClienteId(),
                objDto.getPrestadorId(),
                objDto.getServicoId(),
                objDto.getStatus());
    }
}
