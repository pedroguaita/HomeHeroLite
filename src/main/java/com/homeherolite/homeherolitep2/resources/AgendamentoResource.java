/**
 * Classe criada para resource de agendamento
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.homeherolite.homeherolitep2.domain.Agendamento;
import com.homeherolite.homeherolitep2.dto.AgendamentoDTO;
import com.homeherolite.homeherolitep2.services.AgendamentoService;

import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/agendamentos")
public class AgendamentoResource {

    @Autowired
    private AgendamentoService service;

    @RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<List<AgendamentoDTO>> listarAgendamentos(){
       List<Agendamento> lista = service.listarAgendamentos();
       List<AgendamentoDTO> listaDTO = lista.stream().map(x -> new AgendamentoDTO(x)).collect(Collectors.toList());
       return ResponseEntity.ok().body(listaDTO);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<AgendamentoDTO> buscarId(@PathVariable String id){
       Agendamento obj = service.buscarId(id);
       return ResponseEntity.ok().body(new AgendamentoDTO(obj));
    }

    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<AgendamentoDTO> inserir(@RequestBody AgendamentoDTO objDto){
       Agendamento obj = service.fromDTO(objDto);
       obj = service.inserir(obj);

       URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
       return ResponseEntity.created(uri).build();
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Void> deletar(@PathVariable String id){
       service.deletar(id);
       return ResponseEntity.noContent().build(); 
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<Void> atualizar(@RequestBody AgendamentoDTO objDto, @PathVariable String id){
       Agendamento obj = service.fromDTO(objDto);
       obj.setId(id);
       obj = service.atualizar(obj);
       return ResponseEntity.noContent().build(); 
    }
}
