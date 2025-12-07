package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Servico;
import com.homeherolite.homeherolitep2.dto.ServicoDTO;
import com.homeherolite.homeherolitep2.repository.ServicoRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

@Service
public class ServicoService {
    
    @Autowired //vai instanciar automaticamente ->injeção de dependência automática.
    private ServicoRepository repo;

    //método para listar serviços
    public List<Servico> listarServicos(){
        return repo.findAll();
    }

    //Método para buscar um serviço por ID
    public Servico buscarId(String id){
        Optional<Servico> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Serviço não encontrado."));
    }

    //método para inserir um serviço
    public Servico inserir(Servico obj){
        return repo.insert(obj);
    }

    public Servico fromDTO(ServicoDTO objDto){
        return new Servico(
            objDto.getId(),
            objDto.getNome(),
            objDto.getCategoria(),
            objDto.getDescricao(),
            objDto.getPreco()
        );
    }
}
