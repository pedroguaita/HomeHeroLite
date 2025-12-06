package com.homeherolite.homeherolitep2.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Cliente;
import com.homeherolite.homeherolitep2.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired //vai instanciar automaticamente ->injeção de dependência automática.
    private ClienteRepository repo;

    public List<Cliente> listarClientes(){
        return repo.findAll();
    }
}
