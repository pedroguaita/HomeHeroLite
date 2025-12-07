package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Cliente;
import com.homeherolite.homeherolitep2.dto.ClienteDTO;
import com.homeherolite.homeherolitep2.repository.ClienteRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

@Service
public class ClienteService {
    
    @Autowired //vai instanciar automaticamente ->injeção de dependência automática.
    private ClienteRepository repo;

    //método para listar clientes
    public List<Cliente> listarClientes(){
        return repo.findAll();
    }

    //Método para buscar um cliente por ID
    public Cliente buscarId(String id){
        Optional<Cliente> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado."));
    }

    //método para inserir um cliente
    public Cliente inserir(Cliente obj){
        return repo.insert(obj);
    }

    public Cliente fromDTO(ClienteDTO objDto){
        return new Cliente(objDto.getId(), objDto.getName(),objDto.getEmail(), objDto.getCpf());
    }


}
