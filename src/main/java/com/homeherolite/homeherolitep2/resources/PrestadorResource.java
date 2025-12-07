/**
 * Classe criada para resource de prestador
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

import com.homeherolite.homeherolitep2.domain.Prestador;
import com.homeherolite.homeherolitep2.dto.PrestadorDTO;
import com.homeherolite.homeherolitep2.services.PrestadorService;

import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/prestadores")
public class PrestadorResource {

    @Autowired
    private PrestadorService service;

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 
    public ResponseEntity<List<PrestadorDTO>> listarPrestadores(){ //encapsular estrutura necessária para retornar respostas em HTTP
       List<Prestador> lista = service.listarPrestadores();
       List<PrestadorDTO> listaDTO = lista.stream().map(x -> new PrestadorDTO(x)).collect(Collectors.toList());
       return ResponseEntity.ok().body(listaDTO);  //vai instanciar com código de resposta HTTP (sucesso).
    }

    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<PrestadorDTO> buscarId(@PathVariable String id){
       Prestador obj = service.buscarId(id);
       return ResponseEntity.ok().body(new PrestadorDTO(obj));  //vai instanciar com código de resposta HTTP (sucesso).
    }

    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<PrestadorDTO> inserir(@RequestBody PrestadorDTO objDto){
       Prestador obj = service.fromDTO(objDto);
       obj = service.inserir(obj);

       URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
       return ResponseEntity.created(uri).build();
    }
}
