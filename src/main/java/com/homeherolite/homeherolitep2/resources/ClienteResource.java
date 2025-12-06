/**
 * Classe criada para resource de cliente
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeherolite.homeherolitep2.domain.Cliente;
import com.homeherolite.homeherolitep2.dto.ClienteDTO;
import com.homeherolite.homeherolitep2.services.ClienteService;

import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/clientes")

public class ClienteResource {

    @Autowired
    private ClienteService service;

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 

    //encapsular estrutura necessária para retornar respostas em HTTP
    public ResponseEntity<List<ClienteDTO>> listarClientes(){
       List<Cliente> lista = service.listarClientes();
       List<ClienteDTO> listaDTO = lista.stream().map(x -> new ClienteDTO(x)).collect(Collectors.toList());
       return ResponseEntity.ok().body(listaDTO);  //vai instanciar com código de resposta HTTP (sucesso).
    }
}
