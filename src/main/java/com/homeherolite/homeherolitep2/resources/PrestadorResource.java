/**
 * Classe criada para resource de prestador
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
import org.springframework.web.bind.annotation.RequestMethod;

import com.homeherolite.homeherolitep2.domain.Prestador;
import com.homeherolite.homeherolitep2.dto.PrestadorDTO;
import com.homeherolite.homeherolitep2.services.PrestadorService;

//Controlador REST. 
@RestController
//caminho do ENDPOINT
@RequestMapping(value="/prestadores")
public class PrestadorResource {

    @Autowired
    private PrestadorService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<PrestadorDTO>> listarPrestadores() {

        List<Prestador> lista = service.listarPrestadores();

        // CONVERSÃO LIST<ENTIDADE> -> LIST<DTO>
        // .stream()        -> abre um "fluxo" de objetos da lista
        // .map(x -> ...)   -> para cada objeto x da lista, cria um novo DTO
        // .collect(...)    -> junta tudo de volta em uma List
        List<PrestadorDTO> listaDTO = lista.stream().map(x -> new PrestadorDTO(x)).collect(Collectors.toList());

        return ResponseEntity.ok().body(listaDTO);
    }
}
