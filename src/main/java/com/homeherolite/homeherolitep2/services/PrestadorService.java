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
    
    @Autowired
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

    //método para deletar prestador
    public void deletar(String id){
        buscarId(id);
        repo.deleteById(id);
    }

    //método para atualizar prestador
    public Prestador atualizar(Prestador obj) {
        Prestador newObj = buscarId(obj.getId());
        atualizarDado(newObj, obj);
        return repo.save(newObj);
    }

    private void atualizarDado(Prestador newObj, Prestador obj) {
        newObj.setName(obj.getName());
        newObj.setEmail(obj.getEmail());
        newObj.setCpf(obj.getCpf());
        newObj.setEspecialidade(obj.getEspecialidade());
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
