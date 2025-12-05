/**
 * Classe criada para resource de agendamento
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeherolite.homeherolitep2.domain.Agendamento;
import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/agendamentos")

public class AgendamentoResource {

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 

    //encapsular estrutura necessária para retornar respostas em HTTP
    public ResponseEntity<List<Agendamento>> listarAgendamentos(){
       Agendamento ag1 = new Agendamento("1", "10/12/2025", "14:00", "1", "1", "1", "PENDENTE");
       Agendamento ag2 = new Agendamento("2", "11/12/2025", "09:30", "2", "2", "2", "CONFIRMADO");
       List<Agendamento> lista = new ArrayList<>();
       lista.addAll(Arrays.asList(ag1, ag2));
       return ResponseEntity.ok().body(lista);  //vai instanciar com código de resposta HTTP (sucesso).
    }
}
