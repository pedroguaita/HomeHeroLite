package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Prestador;
import com.homeherolite.homeherolitep2.dto.PrestadorDTO;
import com.homeherolite.homeherolitep2.repository.PrestadorRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

@Service
public class PrestadorService {
    
    @Autowired //vai instanciar automaticamente ->injeção de dependência automática.
    private PrestadorRepository repo;

    //método para listar prestadores
    public List<Prestador> listarPrestadores(){
        return repo.findAll();
    }

    //Método para buscar um prestador por ID
    public Prestador buscarId(String id){
        Optional<Prestador> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Prestador não encontrado."));
    }

    //método para inserir um prestador
    public Prestador inserir(Prestador obj){
        return repo.insert(obj);
    }

    public Prestador fromDTO(PrestadorDTO objDto){
        return new Prestador(
            objDto.getId(),
            objDto.getName(),
            objDto.getEmail(),
            objDto.getCpf(),
            objDto.getEspecialidade()
        );
    }
}
