/**
 * Classe criada para resource de agendamento
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.homeherolite.homeherolitep2.services.AgendamentoService;
import com.homeherolite.homeherolitep2.domain.Agendamento;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/agendamentos")

public class AgendamentoResource {

    @Autowired
    private AgendamentoService service;

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 

    //encapsular estrutura necessária para retornar respostas em HTTP
    public ResponseEntity<List<Agendamento>> listarAgendamentos(){
       List<Agendamento> lista = service.listarAgendamentos();
       return ResponseEntity.ok().body(lista);  //vai instanciar com código de resposta HTTP (sucesso).
    }
}
