/**
 * Classe criada para resource de agendamento
 * @author Pedro Pereira Guaita
 * @since 06/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeherolite.homeherolitep2.domain.Agendamento;
import com.homeherolite.homeherolitep2.dto.AgendamentoDTO;
import com.homeherolite.homeherolitep2.services.AgendamentoService;

import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

// caminho do ENDPOINT
@RequestMapping(value = "/agendamentos")
public class AgendamentoResource {

    @Autowired
    private AgendamentoService service;

    @RequestMapping(method = RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST
    public ResponseEntity<List<AgendamentoDTO>> listarAgendamentos() { // encapsular estrutura necessária para retornar
                                                                       // respostas em HTTP
        List<Agendamento> lista = service.listarAgendamentos();
        List<AgendamentoDTO> listaDTO = lista.stream().map(x -> new AgendamentoDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listaDTO); // vai instanciar com código de resposta HTTP (sucesso).
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<AgendamentoDTO> buscarId(@PathVariable String id) {
        Agendamento obj = service.buscarId(id);
        return ResponseEntity.ok().body(new AgendamentoDTO(obj)); // vai instanciar com código de resposta HTTP
                                                                  // (sucesso).
    }
}
